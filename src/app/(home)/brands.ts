import fs from 'fs';
import path from 'path';
import { Image } from '@/shared/interfaces/image';

const publicDir = path.join(process.cwd(), 'public');

export const languages: Image[] = (() => {
    try {
        return fs.readdirSync(path.join(publicDir, 'assets/brands/stacks'))
            .filter(file => /\.(jpg|jpeg|svg)$/i.test(file))
            .map(file => {
                const src = `/assets/brands/stacks/${file}`;
                const svg = file.endsWith('.svg') ? fs.readFileSync(path.join(publicDir, 'assets/brands/stacks', file), 'utf8') : undefined;
                return {
                    src,
                    svg,
                    alt: file.split('.')[0],
                    width: 200,
                    height: 200,
                    caption: file.split('.')[0].replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
                };
            });
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
})();

export const designed: Image[] = (() => {
    try {
        return fs.readdirSync(path.join(publicDir, 'assets/brands/design'))
            .filter(file => /\.(jpg|jpeg|svg)$/i.test(file))
            .map(file => {
                const src = `/assets/brands/design/${file}`;
                const svg = file.endsWith('.svg') ? fs.readFileSync(path.join(publicDir, 'assets/brands/design', file), 'utf8') : undefined;
                return {
                    src,
                    svg,
                    alt: file.split('.')[0],
                    width: 200,
                    height: 200,
                    caption: file.split('.')[0].replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
                };
            });
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
})()