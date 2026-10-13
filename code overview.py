# ========================== Project Code Summary ========================== #

# --- File Type Counts ---
html_files   = 8
css_files    = 17
js_files     = 18
tsx_files    = 2
ts_files     = 1
py_files     = 1
json_files   = 3
md_files     = 1
jpg_files    = 16
ico_files    = 8

# --- Line Counts ---
html_lines   = 7910
css_lines    = 3226
js_lines     = 2189
tsx_lines    = 32
ts_lines     = 30
py_lines     = 83
json_lines   = 69
md_lines     = 103
# jpg and ico are non-code assets, excluded from line totals

# --- Aggregated Totals ---
total_code_files = html_files + css_files + js_files + tsx_files + ts_files + py_files + json_files + md_files
total_asset_files = jpg_files + ico_files
overall_files = total_code_files + total_asset_files

total_code_lines = html_lines + css_lines + js_lines + tsx_lines + ts_lines + py_lines + json_lines + md_lines
overall_lines = total_code_lines  # assets excluded from line count

# --- Output Code Statistics ---
print("Total HTML Lines:", html_lines)
print("Total CSS Lines:", css_lines)
print("Total JS Lines:", js_lines)
print("Total TSX Lines:", tsx_lines)
print("Total TS Lines:", ts_lines)
print("Total Python Lines:", py_lines)
print("Total JSON Lines:", json_lines)
print("Total Markdown Lines:", md_lines)

print("\n--- Aggregated Totals ---")
print("Total Code Files:", total_code_files)
print("Total Asset Files:", total_asset_files)
print("Overall Files:", overall_files)

print("Total Code Lines:", total_code_lines)
print("Overall Lines of Code:", overall_lines)

# --- Pricing Information ---
usd_value = 5000
bdt_value = usd_value * 122
print(f"\nPricing: BDT {bdt_value} | USD {usd_value}")
