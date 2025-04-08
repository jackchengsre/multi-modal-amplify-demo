import os
import cairosvg

def convert_svg_to_png(input_dir):
    # The SVG files are already in demo/multi-modal/images
    # We'll convert them in place
    svg_files = [f for f in os.listdir(input_dir) if f.endswith('.svg')]
    
    for svg_file in svg_files:
        if 'jms-' in svg_file:  # We only need the JMS dashboard files
            svg_path = os.path.join(input_dir, svg_file)
            png_file = svg_file.replace('.svg', '.png')
            png_path = os.path.join(input_dir, png_file)
            
            print(f"Converting {svg_file} to {png_file}...")
            try:
                cairosvg.svg2png(url=svg_path, write_to=png_path, scale=2.0)
                print(f"Successfully converted {svg_file}")
            except Exception as e:
                print(f"Error converting {svg_file}: {str(e)}")

if __name__ == "__main__":
    convert_svg_to_png('demo/multi-modal/images') 