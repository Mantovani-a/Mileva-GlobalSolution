"""Generate the static landing map from OpenStreetMap road geometry.

Source: https://api.openstreetmap.org/api/0.6/map
Bounds: Pires do Rio, GO. Data © OpenStreetMap contributors (ODbL).
"""

from pathlib import Path
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

WEST, SOUTH, EAST, NORTH = -48.289, -17.307, -48.271, -17.294
WIDTH, HEIGHT = 1200, 760
SOURCE = f"https://api.openstreetmap.org/api/0.6/map?bbox={WEST},{SOUTH},{EAST},{NORTH}"
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "img" / "pires-do-rio-streets.svg"
LIGHT_OUTPUT = OUTPUT.with_name("pires-do-rio-streets-light.svg")
ROAD_TYPES = {"motorway", "trunk", "primary", "secondary", "tertiary", "residential", "living_street", "unclassified", "pedestrian"}


def project(lat, lon):
    return round((lon - WEST) / (EAST - WEST) * WIDTH, 1), round((NORTH - lat) / (NORTH - SOUTH) * HEIGHT, 1)


local_source = Path(__file__).with_name("pires-do-rio-source.osm")
if local_source.exists():
    root = ET.parse(local_source).getroot()
else:
    with urlopen(Request(SOURCE, headers={"User-Agent": "Mileva academic prototype static map"}), timeout=30) as response:
        root = ET.fromstring(response.read())

nodes = {node.get("id"): (float(node.get("lat")), float(node.get("lon"))) for node in root.findall("node")}
roads = []
for way in root.findall("way"):
    tags = {tag.get("k"): tag.get("v") for tag in way.findall("tag")}
    if tags.get("highway") not in ROAD_TYPES:
        continue
    points = [project(*nodes[ref]) for nd in way.findall("nd") if (ref := nd.get("ref")) in nodes]
    if len(points) > 1:
        roads.append((tags["highway"], points))


def path(points):
    return "M" + " ".join(f"{x:g},{y:g}" if i == 0 else f"L{x:g},{y:g}" for i, (x, y) in enumerate(points))


minor = [path(points) for kind, points in roads if kind in {"residential", "living_street", "unclassified", "pedestrian"}]
major = [path(points) for kind, points in roads if kind not in {"residential", "living_street", "unclassified", "pedestrian"}]
route = max((points for _, points in roads), key=lambda points: len(points), default=[])
route_path = path(route) if route else ""
markers = "".join(f'<circle cx="{x:g}" cy="{y:g}" r="7"/><circle cx="{x:g}" cy="{y:g}" r="3" class="marker-core"/>' for x, y in (route[0], route[-1])) if route else ""
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT}" preserveAspectRatio="xMidYMid slice">
  <title>Traçado das ruas de Pires do Rio, Goiás</title>
  <desc>Geometria viária derivada de dados OpenStreetMap. © OpenStreetMap contributors, ODbL.</desc>
  <rect width="{WIDTH}" height="{HEIGHT}" fill="#0f263a"/>
  <g fill="none" stroke="#83acb7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".17">{''.join(f'<path d="{p}"/>' for p in minor)}</g>
  <g fill="none" stroke="#9bc4c9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".24">{''.join(f'<path d="{p}"/>' for p in major)}</g>
  <path d="{route_path}" fill="none" stroke="#36b7a8" stroke-width="4" stroke-linecap="round" stroke-dasharray="3 12" opacity=".67"/>
  <g fill="#17978a" stroke="#a3e9df" stroke-width="2" opacity=".85">{markers}</g>
  <style>.marker-core{{fill:#dff8f3;stroke:none}}</style>
</svg>'''
OUTPUT.write_text(svg, encoding="utf-8")
light_svg = (svg.replace('fill="#0f263a"', 'fill="none"')
    .replace('stroke="#83acb7"', 'stroke="#245b75"').replace('opacity=".17"', 'opacity=".085"')
    .replace('stroke="#9bc4c9"', 'stroke="#174b68"').replace('opacity=".24"', 'opacity=".11"')
    .replace('stroke="#36b7a8"', 'stroke="#136a80"').replace('opacity=".67"', 'opacity=".11"')
    .replace('fill="#17978a"', 'fill="#136a80"').replace('stroke="#a3e9df"', 'stroke="#136a80"')
    .replace('opacity=".85"', 'opacity=".12"').replace('fill:#dff8f3', 'fill:#136a80'))
LIGHT_OUTPUT.write_text(light_svg, encoding="utf-8")
print(f"Wrote both map variants from {len(roads)} OSM road ways")
