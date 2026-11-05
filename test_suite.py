import os
import re
import sys

def test_file_integrity():
    print("=== TEST 1: FILE INTEGRITY & SIZES ===")
    required_files = [
        "index.html",
        "config.js",
        "README.md",
        "css/style.css",
        "css/animations.css",
        "css/responsive.css",
        "js/main.js",
        "js/gallery.js",
        "js/animations.js",
        "js/music.js",
        "js/celebration.js",
        "assets/music/romantic.mp3",
    ]
    for i in range(1, 9):
        required_files.append(f"assets/images/geetu-1.jpg" if i == 1 else f"assets/images/geetu-{i}.jpg")

    missing = []
    for rel_path in required_files:
        path = os.path.normpath(rel_path)
        if not os.path.exists(path):
            missing.append(rel_path)
        else:
            size = os.path.getsize(path)
            if size == 0:
                print(f"FAILED: {rel_path} is empty (0 bytes)")
                return False
            print(f"  OK: {rel_path:<30} ({size:,} bytes)")
    
    if missing:
        print(f"FAILED: Missing files: {missing}")
        return False
    print("PASS: All required files exist and are non-empty.\n")
    return True

def test_html_assets_and_ids():
    print("=== TEST 2: HTML ASSETS & DOM IDS ===")
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    # Find all local CSS and JS links
    local_refs = re.findall(r'(?:href|src)=["\'](assets/[^"\']+|css/[^"\']+|js/[^"\']+|config\.js)["\']', html)
    print(f"Found {len(local_refs)} local asset references in index.html:")
    for ref in local_refs:
        if os.path.exists(os.path.normpath(ref)):
            print(f"  OK asset: {ref}")
        else:
            print(f"  FAILED: Missing local asset: {ref}")
            return False

    # Extract all IDs from index.html
    html_ids = set(re.findall(r'id=["\']([^"\']+)["\']', html))
    print(f"Found {len(html_ids)} unique IDs in index.html.")

    # Check JS files for getElementById calls
    js_files = ["js/main.js", "js/gallery.js", "js/animations.js", "js/music.js", "js/celebration.js"]
    for js_path in js_files:
        with open(js_path, "r", encoding="utf-8") as f:
            js_code = f.read()
        queried_ids = re.findall(r'getElementById\(["\']([^"\']+)["\']\)', js_code)
        for q_id in queried_ids:
            if q_id not in html_ids:
                print(f"  FAILED in {js_path}: Querying ID '{q_id}' not found in index.html!")
                return False
            else:
                print(f"  OK DOM ID in {js_path}: #{q_id}")

    print("PASS: All DOM IDs queried by JavaScript are properly defined in index.html.\n")
    return True

def test_config_references():
    print("=== TEST 3: CONFIG.JS ASSETS & VALUES ===")
    with open("config.js", "r", encoding="utf-8") as f:
        cfg = f.read()

    # Extract photo paths
    photos = re.findall(r'url:\s*["\']([^"\']+)["\']', cfg)
    print(f"Found {len(photos)} photo paths in config.js:")
    for p in photos:
        if os.path.exists(os.path.normpath(p)):
            print(f"  OK photo path: {p}")
        else:
            print(f"  FAILED: Photo path does not exist: {p}")
            return False

    # Extract music path
    music = re.search(r'src:\s*["\']([^"\']+)["\']', cfg)
    if music:
        m_path = music.group(1)
        if os.path.exists(os.path.normpath(m_path)):
            print(f"  OK music path: {m_path}")
        else:
            print(f"  FAILED: Music path does not exist: {m_path}")
            return False

    print("PASS: All config asset paths exist.\n")
    return True

def test_brackets_balance(filename):
    with open(filename, "r", encoding="utf-8") as f:
        code = f.read()
    
    # Strip comments and strings roughly
    code_clean = re.sub(r'//.*', '', code)
    code_clean = re.sub(r'/\*.*?\*/', '', code_clean, flags=re.DOTALL)
    
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    in_quote = None
    escaped = False
    
    for idx, ch in enumerate(code_clean):
        if escaped:
            escaped = False
            continue
        if ch == '\\':
            escaped = True
            continue
        if in_quote:
            if ch == in_quote:
                in_quote = None
            continue
        elif ch in ('"', "'", '`'):
            in_quote = ch
            continue
            
        if ch in '({[':
            stack.append((ch, idx))
        elif ch in ')}]':
            if not stack:
                print(f"  FAILED in {filename}: Unmatched '{ch}' at position {idx}")
                return False
            top, _ = stack.pop()
            if top != pairs[ch]:
                print(f"  FAILED in {filename}: Mismatched '{top}' with '{ch}' at position {idx}")
                return False
                
    if stack:
        top, idx = stack[-1]
        print(f"  FAILED in {filename}: Unclosed '{top}' opened at position {idx}")
        return False
    return True

def test_syntax_balance():
    print("=== TEST 4: SYNTAX & BRACKET BALANCE ===")
    files_to_check = [
        "config.js",
        "js/main.js",
        "js/gallery.js",
        "js/animations.js",
        "js/music.js",
        "js/celebration.js",
        "css/style.css",
        "css/animations.css",
        "css/responsive.css",
    ]
    for fn in files_to_check:
        if test_brackets_balance(fn):
            print(f"  OK syntax balance: {fn}")
        else:
            return False
    print("PASS: All JS and CSS files have balanced brackets & blocks.\n")
    return True

def main():
    results = [
        test_file_integrity(),
        test_html_assets_and_ids(),
        test_config_references(),
        test_syntax_balance(),
    ]
    if all(results):
        print("*****************************************")
        print("ALL TESTS PASSED WITH 100% SUCCESS! (LOVE)")
        print("*****************************************")
        sys.exit(0)
    else:
        print("SOME TESTS FAILED! PLEASE REVIEW.")
        sys.exit(1)

if __name__ == "__main__":
    main()
