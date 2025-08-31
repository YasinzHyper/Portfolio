# Project Media Assets

This directory contains image and video previews for portfolio projects.

## Images (`/public/images/projects/`)
- **algoace-preview.jpg** - AlgoAce dashboard preview (currently placeholder SVG)
- **primeestate-preview.jpg** - PrimeEstate property listings (currently placeholder SVG)  
- **intellicam-preview.jpg** - IntelliCam mobile app interface (currently placeholder SVG)
- **darkguardian-preview.jpg** - DarkGuardian extension dashboard (currently placeholder SVG)

## Videos (`/public/videos/projects/`)
- **algoace-demo.mp4** - AlgoAce functionality demo (add your actual video here)
- **intellicam-demo.mp4** - IntelliCam object detection demo (add your actual video here)

## Usage

To add your actual project media:

1. **Images**: Replace the placeholder SVG files with actual screenshots (JPG/PNG format recommended)
2. **Videos**: Add MP4 files to the videos directory for projects that have video demos
3. **Alt Text**: Update the `alt` property in the project data for accessibility

## Supported Formats

- **Images**: JPG, PNG, WebP
- **Videos**: MP4 (H.264 codec recommended for best browser compatibility)

## Recommended Dimensions

- **Card Previews**: 400x240px (5:3 aspect ratio)
- **Dialog Images**: 1200x675px (16:9 aspect ratio)
- **Videos**: 1920x1080px (16:9 aspect ratio) for best quality

## Features

- Images display in both carousel cards and dialog modals
- Videos only play in dialog modals (with image fallback for cards)
- Automatic poster frame from images when videos are present
- Responsive design with proper aspect ratios
- Accessibility support with alt text
