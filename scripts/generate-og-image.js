import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOGImage() {
  try {
    console.log('🎨 Generating OG image...');

    // Read the SVG file
    const svgBuffer = readFileSync(join(__dirname, '../public/og-image.svg'));

    // Convert SVG to PNG
    await sharp(svgBuffer).png().toFile(join(__dirname, '../public/og-image.png'));

    console.log('✅ OG image generated successfully: public/og-image.png');
    console.log('📏 Dimensions: 1200x630 pixels (optimal for social media)');
  } catch (error) {
    console.error('❌ Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage();
