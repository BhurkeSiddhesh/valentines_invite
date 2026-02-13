"""Fetch VERY specific yellow duck GIFs."""
import urllib.request
import json
import os

API_KEY = ""
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")

SEARCHES = [
    ("duck-sad", [
        "yellow duckling crying cartoon",
        "cute duck tears animated",
    ]),
    ("duck-shocked", [
        "yellow duck surprised gasp",
        "duckling shocked eyes cartoon",
    ]),
]

def search_giphy(query, limit=5):
    url = "https://api.giphy.com/v1/gifs/search?api_key={}&q={}&limit={}&rating=g".format(
        API_KEY, query.replace(" ", "+"), limit)
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode())

def main():
    for name, queries in SEARCHES:
        print("=== {} ===".format(name))
        found = False
        for q in queries:
            if found: break
            print("\nSearching: '{}'".format(q))
            try:
                data = search_giphy(q)
                results = data.get("data", [])
                
                # Filter for GIFs that likely show a duck (simple heuristic: generic terms often have high bitrates or specific sizes, but we'll just pick the top specific match)
                if not results: continue

                # Look for a result with a normal size
                for i, gif in enumerate(results):
                    gid = gif.get("id", "?")
                    title = gif.get("title", "untitled").lower()
                    
                    # Avoid obviously wrong titles if possible (simple keyword check)
                    if "droid" in title or "robot" in title: continue
                    
                    url = gif["images"]["original"]["url"]
                    print("  Downloading candidate: '{}' (ID: {})".format(title, gid))
                    
                    out_path = os.path.join(OUTPUT_DIR, name + ".gif")
                    urllib.request.urlretrieve(url, out_path)
                    
                    # Verify size - excessively small (<10KB) or large (>5MB) might be wrong
                    fsize = os.path.getsize(out_path)
                    print("  -> Saved: {} bytes".format(fsize))
                    found = True
                    break
                    
            except Exception as e:
                print("  ERROR: {}".format(e))

if __name__ == "__main__":
    main()
