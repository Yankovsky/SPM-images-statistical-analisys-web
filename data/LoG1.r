library("EBImage")
test1<-read.table("7_1.txt")

topography<-as.matrix(test1)*10^8

topography<-topography-min(topography) 

LoG<-c(c(0,1,0),c(1,2,1),c(0,1,0))
dim(LoG)<-c(3,3)
LoG



Newtopo<-matrix(ncol=dim(topography)[1],nrow=dim(topography)[2])

for(i in 1:dim(topography)[1]){
  for(j in 1:dim(topography)[2]){
    
    Newtopo[i,j]<-topography[i,j]
    
    
  }
}


for(n in (dim(LoG)[1]+1):dim(topography)[1]){
  for(m in (dim(LoG)[2]+1):dim(topography)[2]){
    Newtopo[n,m]<-0
    for(i in 1:dim(LoG)[1]){
      for(j in 1:dim(LoG)[2]){
        
        Newtopo[n,m]<-Newtopo[n,m]+LoG[i,j]*topography[n-i,m-j]
      
      
      }
    }

    
  }
}
display(Newtopo,method="raster")
