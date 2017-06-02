var w = (this instanceof Panel) ? this : new Window("palette", "Create/Delete Proxy Tool", undefined, {resizeable: true}); // Check if the call is from the Window menu, otherwise create the window

// create a group
w.g = w.add("group", [0,0,180,40]);
//w.orientation = "row";

//button
w.g.b1 = w.g.add("button", [0, 0, 90, 40], "Create Proxy");
w.g.b2 = w.g.add("button", [90, 0, 180, 40], "Delete Proxy");


w.g.b1.onClick = function createproxy() {

var mySelectedItems = [];


for (var i = 1; i <= app.project.numItems; i++){
    if (app.project.item(i).selected)
        mySelectedItems[mySelectedItems.length] = app.project.item(i);
}

//check if list of selected items is empty
//if (mySelectedItems === undefined || array.length == 0) {
 //   alert("No file selected from project tab")
  //  return;
//}

for (var i = 0; i < mySelectedItems.length; i++){
    var mySelection = mySelectedItems[i];
    var sourcefolder = String(mySelection.mainSource.file);
    var sourcefolder = sourcefolder.substr(0, sourcefolder.lastIndexOf("/"))
    var f  = "/L/Projects/" + sourcefolder.substring(3)
    var x = new Folder ("L:/Projects/" + sourcefolder.substring(3))
    if (!x.exists)
        x.create();

    var sourceFolder = new Folder(sourcefolder);
    var destFolder = new Folder(f);
    var sourceFiles = sourceFolder.getFiles(function(f) { return f instanceof File; });
    var myFile = new File();
    for (var w = 0; w < sourceFiles.length; w++){
        myFile = sourceFiles[w];
        myFile.copy(destFolder.path + "/" + destFolder.name + "/" + myFile.name );

    }
    var e = String(mySelection.mainSource.file);
    var e = e.substring(2)
    prox = "/L/Projects" + e
    var proxyfile = new File(prox);
    mySelection.setProxyWithSequence(proxyfile, forceAlphabetical = "true")
}
}

w.g.b2.onClick = function deleteproxy() {

var mySelectedItems = [];
for (var i = 1; i <= app.project.numItems; i++){
    if (app.project.item(i).selected)
        mySelectedItems[mySelectedItems.length] = app.project.item(i);
}

//check if list of selected items is empty
//if (mySelectedItems === undefined || array.length == 0) {
//    alert("No file selected from project tab")
//    return;
//}

for (var i = 0; i < mySelectedItems.length; i++){
    var mySelection = mySelectedItems[i];
//get proxy path from selected
    var deletefolder = String(mySelection.proxySource.file)
    var deletefolder = deletefolder.substr(0, deletefolder.lastIndexOf("/"))
    var deletefolder = "L:/" + deletefolder.substring(3)

    var sourceFolder = new Folder(deletefolder);
    var sourceFiles = sourceFolder.getFiles(function(f) { return f instanceof File; });
    var myFile = new File();
    for (var w = 0; w < sourceFiles.length; w++){

        myFile = sourceFiles[w];
        myFile.remove(myFile.name );


    }
    sourceFolder.remove()
    mySelection.setProxyToNone()

//set Proxy to None

}
}
