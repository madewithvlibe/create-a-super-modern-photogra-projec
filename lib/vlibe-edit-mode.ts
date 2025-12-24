'use client';

let isEditModeActive = false;
let highlightOverlay: HTMLDivElement | null = null;
let selectionOverlay: HTMLDivElement | null = null;
let selectedElement: HTMLElement | null = null;
let lastHoveredElement: HTMLElement | null = null;

// Only run in browser
if (typeof window !== 'undefined') {
  if (!(window as any).__VLIBE_EDIT_MODE_INITIALIZED__) {
    (window as any).__VLIBE_EDIT_MODE_INITIALIZED__ = true;
    initEditMode();
  }
}

function initEditMode() {
  function createHighlightOverlay() {
    if (highlightOverlay) return highlightOverlay;
    highlightOverlay = document.createElement('div');
    highlightOverlay.id = '__vlibe_edit_highlight__';
    highlightOverlay.style.cssText = `
      position: fixed; pointer-events: none; border: 2px solid #F4C7F2;
      background: rgba(244, 199, 242, 0.1); z-index: 999999;
      transition: all 0.1s ease-out; box-shadow: 0 0 0 4px rgba(244, 199, 242, 0.2);
      border-radius: 4px; display: none;
    `;
    document.body.appendChild(highlightOverlay);
    return highlightOverlay;
  }

  function createSelectionOverlay() {
    if (selectionOverlay) return selectionOverlay;
    selectionOverlay = document.createElement('div');
    selectionOverlay.id = '__vlibe_edit_selection__';
    selectionOverlay.style.cssText = `
      position: fixed; pointer-events: none; border: 2px solid #F4C7F2;
      background: rgba(244, 199, 242, 0.15); z-index: 999998;
      box-shadow: 0 0 0 4px rgba(244, 199, 242, 0.3); border-radius: 4px; display: none;
    `;
    document.body.appendChild(selectionOverlay);
    return selectionOverlay;
  }

  function getSelector(element: HTMLElement | null): string {
    if (!element) return '';
    if (element.id) return '#' + CSS.escape(element.id);
    const path: string[] = [];
    let current: HTMLElement | null = element;
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      let selector = current.tagName.toLowerCase();
      if (current.id) { path.unshift('#' + CSS.escape(current.id)); break; }
      if (current.className && typeof current.className === 'string') {
        const classes = current.className.trim().split(/\s+/).filter(c => c && !c.includes(':'));
        if (classes.length > 0) selector += '.' + classes.slice(0, 2).map(c => CSS.escape(c)).join('.');
      }
      const parent = current.parentNode as HTMLElement | null;
      if (parent) {
        const siblings = Array.from(parent.children).filter(el => el.tagName === current!.tagName);
        if (siblings.length > 1) selector += ':nth-of-type(' + (siblings.indexOf(current) + 1) + ')';
      }
      path.unshift(selector);
      current = current.parentNode as HTMLElement | null;
      if (current === document.body) { path.unshift('body'); break; }
    }
    return path.join(' > ');
  }

  function getElementInfo(element: HTMLElement | null) {
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);
    const tagName = element.tagName.toLowerCase();
    const textTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'button', 'label', 'li', 'td', 'th', 'div'];
    const isTextElement = textTags.includes(tagName) && element.childNodes.length > 0 &&
      Array.from(element.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
    const isImageElement = tagName === 'img' || (tagName === 'div' && styles.backgroundImage !== 'none');
    return {
      tagName, textContent: isTextElement ? element.textContent?.trim().slice(0, 200) : null,
      className: element.className || '', id: element.id || '', selector: getSelector(element),
      computedStyles: { color: styles.color, backgroundColor: styles.backgroundColor, fontSize: styles.fontSize,
        fontWeight: styles.fontWeight, padding: styles.padding, margin: styles.margin },
      boundingRect: { top: rect.top + window.scrollY, left: rect.left + window.scrollX, width: rect.width, height: rect.height },
      isTextElement, isImageElement, imageSrc: tagName === 'img' ? (element as HTMLImageElement).src : undefined,
    };
  }

  function updateHighlight(element: HTMLElement | null) {
    if (!highlightOverlay || !element) { if (highlightOverlay) highlightOverlay.style.display = 'none'; return; }
    const rect = element.getBoundingClientRect();
    highlightOverlay.style.display = 'block';
    highlightOverlay.style.top = rect.top + 'px'; highlightOverlay.style.left = rect.left + 'px';
    highlightOverlay.style.width = rect.width + 'px'; highlightOverlay.style.height = rect.height + 'px';
  }

  function updateSelectionOverlay(element: HTMLElement | null) {
    if (!selectionOverlay) createSelectionOverlay();
    if (!element) { if (selectionOverlay) selectionOverlay.style.display = 'none'; return; }
    const rect = element.getBoundingClientRect();
    selectionOverlay!.style.display = 'block';
    selectionOverlay!.style.top = rect.top + 'px'; selectionOverlay!.style.left = rect.left + 'px';
    selectionOverlay!.style.width = rect.width + 'px'; selectionOverlay!.style.height = rect.height + 'px';
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isEditModeActive) return;
    const target = e.target as HTMLElement;
    if (target === highlightOverlay || target === selectionOverlay || target.tagName === 'HTML' || target.tagName === 'BODY') return;
    if (target !== lastHoveredElement) {
      lastHoveredElement = target;
      updateHighlight(target);
      const info = getElementInfo(target);
      if (info) window.parent.postMessage({ type: 'ELEMENT_HOVERED', payload: info }, '*');
    }
  }

  function handleClick(e: MouseEvent) {
    if (!isEditModeActive) return;
    e.preventDefault(); e.stopPropagation();
    const target = e.target as HTMLElement;
    if (target === highlightOverlay || target === selectionOverlay) return;
    selectedElement = target;
    updateSelectionOverlay(target);
    const info = getElementInfo(target);
    if (info) window.parent.postMessage({ type: 'ELEMENT_CLICKED', payload: info }, '*');
  }

  function enableEditMode() {
    isEditModeActive = true;
    createHighlightOverlay(); createSelectionOverlay();
    document.body.style.cursor = 'crosshair';
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick, { capture: true });
  }

  function disableEditMode() {
    isEditModeActive = false;
    if (highlightOverlay) highlightOverlay.style.display = 'none';
    if (selectionOverlay) selectionOverlay.style.display = 'none';
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleClick, { capture: true });
  }

  function applyStyleChange(selector: string, property: string, value: string) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) element.style[property as any] = value;
  }

  function applyTextChange(selector: string, newText: string) {
    const element = document.querySelector(selector);
    if (element) element.textContent = newText;
  }

  window.addEventListener('message', (event: MessageEvent) => {
    const message = event.data;
    if (!message?.type) return;
    switch (message.type) {
      case 'EDIT_MODE_ENABLE': enableEditMode(); break;
      case 'EDIT_MODE_DISABLE': disableEditMode(); break;
      case 'APPLY_STYLE_CHANGE': if (message.payload) applyStyleChange(message.payload.selector, message.payload.property, message.payload.value); break;
      case 'APPLY_TEXT_CHANGE': if (message.payload) applyTextChange(message.payload.selector, message.payload.newText); break;
      case 'CLEAR_SELECTION': selectedElement = null; updateSelectionOverlay(null); break;
    }
  });

  // Notify parent that script is ready - send periodically until acknowledged
  let readyInterval: ReturnType<typeof setInterval> | null = null;
  let readyAcknowledged = false;
  function sendReady() { if (!readyAcknowledged) window.parent.postMessage({ type: 'EDIT_MODE_READY' }, '*'); }
  sendReady();
  readyInterval = setInterval(() => sendReady(), 500);
  setTimeout(() => { if (readyInterval) clearInterval(readyInterval); }, 30000);
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'EDIT_MODE_ENABLE' || e.data?.type === 'EDIT_MODE_READY_ACK') {
      readyAcknowledged = true;
      if (readyInterval) { clearInterval(readyInterval); readyInterval = null; }
    }
  });
}

export {};
