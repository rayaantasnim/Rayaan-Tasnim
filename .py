#-------------------------- Final Overview ----------------------------- #

index_html = 1579

index_js = 24
index_css = 575

style_css = 127
javascript_js = 359

print (index_html, index_js, index_css, style_css, javascript_js)

print("Total HTML Code: ", index_html)
print("Total CSS Code: ", style_css + index_css)
print("Total JS Code: ", javascript_js + index_js)

stacks = """
1. Google Font API
2. Three.js
3. GSAP (Green Sock Animation)
4. Tailwand CSS Framework
5. GSTAtic
6. CDN.js
"""

print("Stacks used: ", stacks)
print ("\n\n\nTotal Line of code: ", index_html + index_js + index_css + style_css + javascript_js)
print(f"Pricings: BDT {3500*122} and \nUSD: 3500")