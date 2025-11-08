/**
 * 从图片中提取主色调
 * @param {HTMLImageElement} image - 图片元素
 * @returns {Promise<string>} - 提取的主色调（十六进制格式）
 *
 * @example
 * import { extractColorFromImage } from '@aviala-design/color';
 *
 * // 从已加载的图片元素提取主色调
 * const img = document.getElementById('myImage');
 * const dominantColor = await extractColorFromImage(img);
 * console.log(dominantColor); // '#3491FA'
 *
 * @example
 * // 动态创建图片并提取颜色
 * const img = new Image();
 * img.crossOrigin = 'anonymous';
 * img.onload = async () => {
 *   const color = await extractColorFromImage(img);
 *   document.body.style.backgroundColor = color;
 * };
 * img.src = 'https://example.com/image.jpg';
 */
export function extractColorFromImage(image: HTMLImageElement): Promise<string>;
/**
 * 从文件中读取图片并提取颜色
 * @param {File} file - 图片文件
 * @returns {Promise<string>} - 提取的主色调（十六进制格式）
 *
 * @example
 * import { extractColorFromFile } from '@aviala-design/color';
 *
 * // 配合文件上传控件使用
 * const fileInput = document.getElementById('fileInput');
 * fileInput.addEventListener('change', async (event) => {
 *   const file = event.target.files[0];
 *   if (file) {
 *     const color = await extractColorFromFile(file);
 *     console.log('提取的主色调:', color);
 *   }
 * });
 *
 * @example
 * // 处理拖拽上传
 * dropZone.addEventListener('drop', async (event) => {
 *   event.preventDefault();
 *   const file = event.dataTransfer.files[0];
 *   try {
 *     const dominantColor = await extractColorFromFile(file);
 *     updateTheme(dominantColor);
 *   } catch (error) {
 *     console.error('提取颜色失败:', error);
 *   }
 * });
 */
export function extractColorFromFile(file: File): Promise<string>;
//# sourceMappingURL=image-color.d.ts.map