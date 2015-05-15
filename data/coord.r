nt<-filter2(topography,LoG)

treshold<-Newtopo>0.17
display(treshold,method="raster")

bin = fillHull(treshold)
last = bwlabel(bin)
xy = computeFeatures.moment(last)[, c("m.cx", "m.cy")]
xy[1:4,]
xy=round(xy)
