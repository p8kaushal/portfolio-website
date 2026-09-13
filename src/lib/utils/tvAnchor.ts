export interface AnchorRatio {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface ComputedBounds {
	left: number;
	top: number;
	width: number;
	height: number;
}

export const TV_ANCHOR: AnchorRatio = {
	x: 0.132,
	y: 0.175,
	w: 0.736,
	h: 0.650
};

export function calculateHardwareBounds(
	anchor: AnchorRatio = TV_ANCHOR,
	viewportWidth: number,
	viewportHeight: number
): ComputedBounds {
	const imageAspectRatio = 16 / 9;
	const viewportAspectRatio = viewportWidth / viewportHeight;

	let renderWidth: number;
	let renderHeight: number;
	let offsetX = 0;
	let offsetY = 0;

	if (viewportAspectRatio > imageAspectRatio) {
		renderWidth = viewportWidth;
		renderHeight = viewportWidth / imageAspectRatio;
		offsetY = (viewportHeight - renderHeight) / 2;
	} else {
		renderHeight = viewportHeight;
		renderWidth = viewportHeight * imageAspectRatio;
		offsetX = (viewportWidth - renderWidth) / 2;
	}

	const left = offsetX + anchor.x * renderWidth;
	const top = offsetY + anchor.y * renderHeight;
	const width = anchor.w * renderWidth;
	const height = anchor.h * renderHeight;

	return { left, top, width, height };
}
