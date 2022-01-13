// This is the code for apps script part 

var sublabels=["kludge","Lambda","Elektronica","Epoch","vibes","RangdeManch","litsoc","Infero","shuffle","Robotix","Torque","Aero","Prakriti"]
// change the clubs here for making new clubs labels
function start() {
  // Here we have start of the function let we use it as main() in C and all functions to be executed must be in this function to be called for eg: func() in this
  // Creating Labels
  // deletealllabels(GmailApp.getUserLabels());
  clubsLabels();
  general();
  assignclublabel();
  assignsports();
}
function clubsLabels(){
  GmailApp.createLabel("clubs");
  for(i=0;i<sublabels.length;i++){
    GmailApp.createLabel(`clubs/${sublabels[i]}`);
  }
}
function general(){
  GmailApp.createLabel("mess");
  GmailApp.createLabel("Hostel Office");
  GmailApp.createLabel("Found and Lost");
  GmailApp.createLabel('sports');
  GmailApp.createLabel('Interns Related');
}
function deletealllabels(labels){
  for(i=0;i<labels.length;i++){
    GmailApp.deleteLabel(labels[i])
  }
}
function assignclublabel(){
  var threads = GmailApp.getInboxThreads();
  for(i=0;i<threads.length;i++){
    for(j=0;j<sublabels.length;j++){
      var s=new RegExp(sublabels[j],"i");
      if(s.test(threads[i].getMessages()[0].getReplyTo())||s.test(threads[i].getMessages()[0].getFrom())){
        threads[i].addLabel(GmailApp.getUserLabelByName(`clubs/${sublabels[j]}`))
        threads[i].addLabel(GmailApp.getUserLabelByName('clubs'))
        threads[i].moveToArchive();
        continue;
      }
    }
  }

}
function assignsports(){
  var threads = GmailApp.search('from:"Sports Faculty In-Charge <fic.sports@iith.ac.in>"');
  for(i=0;i<threads.length;i++){
    threads[i].addLabel(GmailApp.getUserLabelByName('sports'));
  }
}
