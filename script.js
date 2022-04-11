		//  color thief
		//  cdn: https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.0.1/color-thief.min.js
		//  web: http://lokeshdhakar.com/projects/color-thief


		const swatches = 2;
		const colorThief = new ColorThief();

		const palette = document.querySelector('.palette');
		const image = document.querySelector('.preview');
		const input = document.querySelector('[type="file"]');

		input.onchange = e => {
			image.src = URL.createObjectURL(input.files[0])
		}

		image.onload = () => {
			URL.revokeObjectURL(image.src);
			const colors = colorThief.getPalette(image, swatches);
			while (palette.firstChild) palette.removeChild(palette.firstChild);
			colors.reduce((palette, rgb) => {
				const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
				const swatch = document.createElement('div');
				swatch.style.setProperty('--color', color);
				swatch.setAttribute('color', color);
				palette.appendChild(swatch);
				return palette;
			}, palette);
			color_copy()

		}

		function copy_text_fun(id) {
			var copyText = id.attributes.color.value;
			console.dir(copyText);
			var input = document.createElement("textarea");
			input.value = copyText;
			document.body.appendChild(input);
			input.select();
			document.execCommand("Copy");
			input.remove();
			document.querySelector('.result').innerHTML = input.value;
		}

		function color_copy() {
			const target_copy = document.querySelectorAll(".palette div");
			target_copy.forEach(item => {
				item.addEventListener('click', function () {
					console.dir(this.attributes.color);
					copy_text_fun(this);
				})
			})
		}