mm[1:2000]<-0
MM[1:2000]<-0
H[1:2000]<-0
for(i in 1:dim(xy)[1]){
  if (xy[i,1]>5&&xy[i,2]>5&&xy[i,1]<295&&xy[i,2]<295){
    mm[i]<-min(topography[(xy[i,1]-5):(xy[i,1]+5),(xy[i,2]-5):(xy[i,2]+5)])
    MM[i]<-max(topography[(xy[i,1]-5):(xy[i,1]+5),(xy[i,2]-5):(xy[i,2]+5)])
    H[i]<-MM[i]-mm[i]
  }

}



