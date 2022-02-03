for x in ../../public/assets/*glb ; do npx gltfjsx -r /assets/ $x ; done
for x in *js ; do sed -i 's,/../home/gunnar/projects/covidgame-3d/public/,,' $x ; done
