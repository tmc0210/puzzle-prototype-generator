const tileSizeProperty = "--tile-size";
const tileSizeCapProperty = "--tile-size-cap";

export class BoardFitController {
  private readonly observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      fitBoard(entry.target as HTMLElement);
    }
  });

  observe(container: HTMLElement | null): void {
    this.observer.disconnect();
    if (!container) {
      return;
    }
    fitBoard(container);
    this.observer.observe(container);
  }
}

function fitBoard(container: HTMLElement): void {
  const board = container.querySelector<HTMLElement>("[data-fit-board]");
  if (!board) {
    return;
  }

  const width = positiveNumber(board.dataset.boardWidth);
  const height = positiveNumber(board.dataset.boardHeight);
  if (!width || !height) {
    return;
  }

  const containerStyle = window.getComputedStyle(container);
  const availableWidth = container.clientWidth
    - cssPixels(containerStyle.paddingLeft)
    - cssPixels(containerStyle.paddingRight);
  const availableHeight = container.clientHeight
    - cssPixels(containerStyle.paddingTop)
    - cssPixels(containerStyle.paddingBottom);
  const cap = cssPixels(window.getComputedStyle(board).getPropertyValue(tileSizeCapProperty));
  const fittedSize = Math.min(
    cap > 0 ? cap : Number.POSITIVE_INFINITY,
    availableWidth / width,
    availableHeight / height,
  );
  if (!Number.isFinite(fittedSize) || fittedSize <= 0) {
    return;
  }

  // 向下保留千分之一像素，避免布局取整后出现边缘溢出。
  const safeSize = Math.floor(fittedSize * 1000) / 1000;
  board.style.setProperty(tileSizeProperty, `${safeSize}px`);
}

function positiveNumber(value: string | undefined): number | undefined {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function cssPixels(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
