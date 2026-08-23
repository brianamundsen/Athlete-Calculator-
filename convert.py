import os, re, json
from bs4 import BeautifulSoup

SRC = "/home/claude/site/mailerlite"
OUT = "/home/claude/build/src"

CALCULATOR_FILES = {
    "vertical-jump-percentile.html",
    "sprint-speed-calculator.html",
    "squat-strength-calculator.html",
    "broad-jump-sprint-speed-calculator.html",
    "can-i-dunk-calculator.html",
}

CORE_NAV_LABELS = {"Home", "Articles", "Vertical Jump", "Sprint Speed", "Squat Strength"}

def fix_links(html):
    # strip .html off internal athletecalculator.com links, but leave external/asset links alone
    html = re.sub(r'(athletecalculator\.com/[a-zA-Z0-9_\-]*)\.html', r'\1', html)
    return html

def make_relative(html):
    # convert absolute internal links to relative paths (handles both domain.com/path and bare domain.com)
    html = re.sub(r'https://athletecalculator\.com/?', '/', html)
    return html

def slug_for(fname):
    if fname == "index.html":
        return "/"
    if fname == "privacy-policy.html":
        return "/privacy-policy"
    return "/" + fname.rsplit(".html", 1)[0]

def yaml_escape(s):
    if s is None:
        return '""'
    s = s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').strip()
    return f"\"{s}\""

skip = {"_redirects", "ads.txt", "sitemap.xml"}
files = [f for f in os.listdir(SRC) if f.endswith(".html")]
# drop the duplicate older versions, keep the "(1)" richer versions under the clean name
dupes_to_drop = set()
rename_map = {}
for f in files:
    if f.endswith(" (1).html"):
        base = f.replace(" (1).html", ".html")
        dupes_to_drop.add(base)  # drop the older, thinner version
        rename_map[f] = base     # the (1) version becomes canonical under the clean name

report = []

for f in sorted(files):
    if f in dupes_to_drop:
        continue
    out_name = rename_map.get(f, f)
    path = os.path.join(SRC, f)
    with open(path, encoding="utf-8") as fh:
        raw = fh.read()
    soup = BeautifulSoup(raw, "lxml")
    from bs4 import Comment
    for c in soup.find_all(string=lambda t: isinstance(t, Comment)):
        c.extract()

    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    desc_tag = soup.find("meta", attrs={"name": "description"})
    description = desc_tag["content"].strip() if desc_tag and desc_tag.get("content") else ""

    jsonld_blocks = soup.find_all("script", attrs={"type": "application/ld+json"})
    jsonld_html = "\n".join(str(b) for b in jsonld_blocks)
    jsonld_html = fix_links(jsonld_html)

    nav = soup.find("nav")
    nav_context_url = ""
    nav_context_label = ""
    nav_active = ""
    if nav:
        for a in nav.find_all("a"):
            if "nav-brand" in (a.get("class") or []):
                continue
            label = a.get_text(strip=True)
            href = a.get("href", "")
            if "articles" in href and out_name != "articles.html":
                continue
            if label not in CORE_NAV_LABELS and label not in ("", "Home"):
                nav_context_url = href
                nav_context_label = label
        if out_name == "articles.html":
            nav_active = "articles"

    style_tag = soup.find("style")
    style_html = str(style_tag) if style_tag else ""
    style_html = fix_links(style_html)
    style_html = make_relative(style_html)

    footer = soup.find("footer")
    disclaimer_lines = []
    if footer:
        for p in footer.find_all("p", recursive=False):
            if p.find("a"):
                continue  # this is the link row, skip -- unified footer replaces it
            txt = str(p.decode_contents()).strip()
            if txt:
                disclaimer_lines.append(txt)

    body = soup.find("body")
    main_content = ""
    if body:
        # collect everything in body except <nav> and <footer> (both handled by shared includes)
        collecting = []
        for child in body.children:
            name = getattr(child, "name", None)
            if name in ("nav", "footer"):
                continue
            text = str(child).strip()
            if not text:
                continue
            collecting.append(str(child))
        main_content = "".join(collecting)
    main_content = fix_links(main_content)
    main_content = make_relative(main_content)
    # Wrap every data-table in a scrollable div — more reliable across mobile
    # browsers than relying on display:block + overflow-x directly on <table>.
    _wrap_soup = BeautifulSoup(main_content, "lxml")
    for _table in _wrap_soup.find_all("table", class_="data-table"):
        _wrapper = _wrap_soup.new_tag("div", **{"class": "table-scroll"})
        _table.wrap(_wrapper)
    _body = _wrap_soup.find("body")
    if _body:
        main_content = "".join(str(c) for c in _body.children)
    else:
        main_content = str(_wrap_soup)

    is_calculator = out_name in CALCULATOR_FILES
    mailerlite = is_calculator

    canonical_path = slug_for(out_name)
    layout_name = "base.njk"

    fm = []
    fm.append("---")
    fm.append(f"layout: {layout_name}")
    fm.append(f"title: {yaml_escape(title)}")
    fm.append(f"description: {yaml_escape(description)}")
    fm.append(f"canonicalPath: {yaml_escape(canonical_path)}")
    fm.append(f"mailerlite: {'true' if mailerlite else 'false'}")
    fm.append("pageStyle: |-")
    for line in style_html.splitlines():
        fm.append("  " + line)
    if nav_active:
        fm.append(f"navActive: {yaml_escape(nav_active)}")
    if nav_context_url:
        fm.append(f"navContextUrl: {yaml_escape(fix_links(make_relative(nav_context_url)))}")
        fm.append(f"navContextLabel: {yaml_escape(nav_context_label)}")
    if disclaimer_lines:
        fm.append("disclaimer:")
        for line in disclaimer_lines:
            fm.append(f"  - {yaml_escape(line)}")
    fm.append("jsonld: |-")
    for line in jsonld_html.splitlines():
        fm.append("  " + line)
    fm.append("---")

    permalink_slug = "index.html" if canonical_path == "/" else canonical_path.lstrip("/") + "/index.html"
    fm.insert(len(fm) - 1, f"permalink: \"{permalink_slug}\"")

    out_path = os.path.join(OUT, out_name.replace(".html", ".njk"))
    with open(out_path, "w", encoding="utf-8") as out_fh:
        out_fh.write("\n".join(fm) + "\n")
        out_fh.write(main_content)

    report.append((out_name, canonical_path, mailerlite, bool(nav_context_url), len(disclaimer_lines)))

print(f"Converted {len(report)} pages")
for r in report:
    print(r)
