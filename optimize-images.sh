#!/bin/bash

# Install imagemin CLI tools if needed
echo "Starting image optimization for Vercel deployment..."

# Function to optimize PNG files
optimize_png() {
    local file="$1"
    if command -v pngquant &> /dev/null; then
        pngquant --speed 1 --force 256 "$file" -o "${file%.png}-opt.png"
        mv "${file%.png}-opt.png" "$file"
        echo "Optimized: $file"
    fi
}

# Function to compress with native tools
compress_image() {
    local file="$1"
    if [[ "$file" == *.png ]]; then
        # Use available compression method
        if command -v convert &> /dev/null; then
            convert "$file" -quality 85 -strip "$file"
            echo "Compressed: $file (convert)"
        fi
    fi
}

# Optimize all images
for img in public/*.png; do
    if [ -f "$img" ]; then
        # Get original size
        original=$(du -h "$img" | cut -f1)
        
        # Basic PNG optimization using convert if available
        if command -v convert &> /dev/null; then
            convert "$img" -quality 90 -interlace Plane -strip "$img.tmp" && mv "$img.tmp" "$img"
        fi
        
        # Get new size
        new=$(du -h "$img" | cut -f1)
        echo "Optimized: $img ($original → $new)"
    fi
done

echo "Image optimization complete!"
