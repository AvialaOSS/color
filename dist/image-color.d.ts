/**
 * 从图片中提取主色调
 * @param {HTMLImageElement} image - 图片元素
 * @returns {Promise<string>} - 提取的主色调（十六进制格式）
 */
export function extractColorFromImage(image: HTMLImageElement): Promise<string>;
/**
 * 从文件中读取图片并提取颜色
 * @param {File} file - 图片文件
 * @returns {Promise<string>} - 提取的主色调（十六进制格式）
 */
export function extractColorFromFile(file: File): Promise<string>;
