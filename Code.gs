var sublabels = ["kludge", "Lambda", "Elektronica", "Epoch", "vibes", "RangdeManch", "litsoc", "Infero", "shuffle", "Robotix", "Torque", "Aero", "Prakriti"]
// change the clubs here for making new clubs labels(these are sublabels pf label named clubs)


function start() {
  // Here we have start of the function let we use it as main() in C and all functions to be executed must be in this function to be called for eg: func() in this
  // Creating Labels
  // deletealllabels(GmailApp.getUserLabels());
  clubsLabels();
  general();
  assignclublabel();
  assignsports();
  assignmess();
  assignhosteloffice();
  assignfoundlost();
  assignintern();
  assignGeneral();
  assignSeminar();
  assignOcs();
  assignNewjoins();
  assignVivavoice();
  assignAcademics();
  assignLectureseries();
  assignAnnouncements();
  assignDirector();
  assignGoogleclassroom();
}

function assignDirector(){
  GmailApp.createLabel('Director');
  var threads=GmailApp.getInboxThreads();
  for(i=0;i<threads.length;i++){
    var message = threads[i].getMessages()[0];
    if(message.getFrom()=='Director IIT Hyderabad <director@iith.ac.in>'){
      threads[i].addLabel(GmailApp.getUserLabelByName('Director'));
    }
  }
}

function assignLectureseries(){
  GmailApp.createLabel('Industry Lecture series');
  var threads=GmailApp.getInboxThreads();
  for(i=0;i<threads.length;i++){
    var message = threads[i].getMessages()[0];
    if(message.getFrom().includes('industry.lecture')){
      threads[i].addLabel(GmailApp.getUserLabelByName('Industry Lecture series'));
    }
  }
}

function assignGoogleclassroom(){
  GmailApp.createLabel('Google classroom');
  var threads=GmailApp.getInboxThreads();
  for(i=0;i<threads.length;i++){
    var message = threads[i].getMessages()[0];
    if(message.getFrom().includes('@classroom.google.com')){
      threads[i].addLabel(GmailApp.getUserLabelByName('Google classroom'));
    }
  }
}
function clubsLabels() {
  GmailApp.createLabel("clubs");
  for (i = 0; i < sublabels.length; i++) {
    GmailApp.createLabel(`clubs/${sublabels[i]}`);
  }
  // creating label named clubs and then creating sublabels i.e clubs
}

function assignAnnouncements(){
  GmailApp.createLabel('Announcements');
  var threads=GmailApp.getInboxThreads();
  for(i=0;i<threads.length;i++){
    var message=GmailApp.getInboxThreads()[i].getMessages()[0];
    var ann=new RegExp("announcement","i");
    if(ann.test(message.getReplyTo())|| ann.test(message.getTo()) || ann.test(message.getFrom())|| ann.test(message.getCc())|| ann.test(message.getBcc()))
    GmailApp.getInboxThreads()[i].addLabel(GmailApp.getUserLabelByName('Announcements'))
  }
}

function general() {
  GmailApp.createLabel("Office of Career services");
  GmailApp.createLabel("mess");
  GmailApp.createLabel("Hostel Related");
  GmailApp.createLabel("Found and Lost");
  GmailApp.createLabel('sports');
  GmailApp.createLabel('Interns Related');
  GmailApp.createLabel("General");
  GmailApp.createLabel("Seminars and Colloquium");
  GmailApp.createLabel('New joining');
  GmailApp.createLabel('Viva voice');
  GmailApp.createLabel('Academics');
  GmailApp.createLabel('Academics/Grade cards');
  GmailApp.createLabel('Academics/Exams');
  // Here we are creating general labels like Hostel office, Mess, Found and Lost, Sports, Internship related
}

function assignSeminar(){
  var threads=GmailApp.getInboxThreads();
  for(i=0;i<threads.length;i++){
    var seminar=new RegExp("seminar","i");
    var coll=new RegExp("colloquium","i");
    // adding labels for seminars and Colloquium announcements 
    if(seminar.test(threads[i].getMessages()[0].getFrom())||seminar.test(threads[i].getMessages()[0].getPlainBody()||coll.test(threads[i].getMessages()[0].getSubject()))){
      threads[i].addLabel(GmailApp.getUserLabelByName('Seminars and Colloquium'))
    }
  }
}

function assignAcademics(){
  var threads=GmailApp.getInboxThreads();
  for(i=0;i<threads.length;i++){
    var grade=new RegExp("grade","i");
    var card=new RegExp("card","i");
    var acad=new RegExp("academic","i")
    var course = new RegExp("course","i");
    var exam = new RegExp("exam","i");
    var paper = new RegExp("question paper","i");
    var viva=new RegExp("viva","i");
    // adding labels for seminars and Colloquium announcements 
    if(grade.test(threads[i].getMessages()[0].getSubject())&&card.test(threads[i].getMessages()[0].getSubject())){
      threads[i].addLabel(GmailApp.getUserLabelByName('Academics/Grade cards'))
    }
    if(acad.test(threads[i].getMessages()[0].getFrom())){
      threads[i].addLabel(GmailApp.getUserLabelByName('Academics'))
    }
    if(course.test(threads[i].getMessages()[0].getPlainBody())){
      threads[i].addLabel(GmailApp.getUserLabelByName('Academics'))
    }
    if(paper.test(threads[i].getMessages()[0].getSubject())||paper.test(threads[i].getMessages()[0].getPlainBody())||exam.test(threads[i].getMessages()[0].getSubject())||exam.test(threads[i].getMessages()[0].getPlainBody()&&!viva.test(threads[i].getMessages()[0].getSubject()))){
      threads[i].addLabel(GmailApp.getUserLabelByName('Academics/Exams'))
  }
  }
}

function assignVivavoice(){
  var threads=GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var message = threads[i].getMessages()[0];
    var viva=new RegExp("viva","i");
    if (viva.test(message.getSubject()))
      threads[i].addLabel(GmailApp.getUserLabelByName("Viva voice"));
  }
}

function assignNewjoins(){
  var threads=GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var message = threads[i].getMessages()[0];
    var place=new RegExp("new joining","i")
    if (place.test(message.getSubject()))
      threads[i].addLabel(GmailApp.getUserLabelByName("New joining"));
  }
}

function assignOcs(){
  var threads=GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var message = threads[i].getMessages()[0];
    var place=new RegExp("office.placement","i")
    if (place.test(message.getReplyTo())|| place.test(message.getTo()) || place.test(message.getFrom()) || place.test(message.getBcc()))
      threads[i].addLabel(GmailApp.getUserLabelByName("Office of Career services"));
  }
}
function deletealllabels(labels) {
  // Deleting all existing labels
  for (i = 0; i < labels.length; i++) {
    GmailApp.deleteLabel(labels[i])
  }
}

function assignGeneral(){
  // adding cab sharing and mess swap also surveys for projects labels
  GmailApp.createLabel("General/Mess swap");
  GmailApp.createLabel("General/Cab Sharing");
  GmailApp.createLabel("General/Surveys");
  var threads=GmailApp.getInboxThreads();
  for(i=0;i<threads.length;i++){
    var cab=new RegExp("cab","i");
    var swap=new RegExp("mess swap","i");
    var survey=new RegExp("survey","i");
    if(cab.test(threads[i].getMessages()[0].getSubject())||swap.test(threads[i].getMessages()[0].getBody())){
      threads[i].addLabel(GmailApp.getUserLabelByName('General/Cab Sharing'));
    }
    if(swap.test(threads[i].getMessages()[0].getSubject())||swap.test(threads[i].getMessages()[0].getBody())){
      threads[i].addLabel(GmailApp.getUserLabelByName('General/Mess swap'));
    }
    if(survey.test(threads[i].getMessages()[0].getSubject())){
      threads[i].addLabel(GmailApp.getUserLabelByName('General/Surveys'));
    }
  }
}

function assignclublabel() {
  var threads = GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    for (j = 0; j < sublabels.length; j++) {
      var s = new RegExp(sublabels[j], "i");
      if (s.test(threads[i].getMessages()[0].getReplyTo()) || s.test(threads[i].getMessages()[0].getFrom())) {
        threads[i].addLabel(GmailApp.getUserLabelByName(`clubs/${sublabels[j]}`))
        threads[i].addLabel(GmailApp.getUserLabelByName('clubs'))
      }
    }
  }
  // assigning club labels including sublabels 
}

function assignsports() {
  // Assigning sports labels 
  var threads = GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var s = new RegExp('\\bsport\\b', "i");
    var t = new RegExp('tournament', "i");
    var co=new RegExp('court', "i");
    var fo=new RegExp('food court',"i");
    // we should look for [sport] court but not food court as keyword so
    var g=new RegExp('ground', "i");
    if (s.test(threads[i].getMessages()[0].getReplyTo()) || s.test(threads[i].getMessages()[0].getFrom()) || s.test(threads[i].getMessages()[0].getPlainBody())||g.test(threads[i].getMessages()[0].getSubject()) ||(co.test(threads[i].getMessages()[0].getSubject())&&!fo.test(threads[i].getMessages()[0].getSubject()))|| s.test(threads[i].getMessages()[0].getBcc()) || s.test(threads[i].getMessages()[0].getCc()) || s.test(threads[i].getMessages()[0].getSubject()) || (s.test(threads[i].getMessages()[0].getBody())&&t.test(threads[i].getMessages()[0].getBody()))) {
      threads[i].addLabel(GmailApp.getUserLabelByName('sports'));
    }
  }
}

function assignmess() {
  // adding mess label based on mess menu nd food keywords
  var threads = GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var message = threads[i].getMessages()[0];
    if (message.getReplyTo() === 'Mess Secretary <mess_secya@gymkhana.iith.ac.in>' || message.getTo() === 'Mess Secretary <mess_secya@gymkhana.iith.ac.in>' || message.getFrom() === 'Mess Secretary <mess_secya@gymkhana.iith.ac.in>' || message.getCc() === 'Mess Secretary <mess_secya@gymkhana.iith.ac.in>' || message.getBcc() === 'Mess Secretary <mess_secya@gymkhana.iith.ac.in>')
      threads[i].addLabel(GmailApp.getUserLabelByName("mess"));

    var m = new RegExp('[\\s]+mess[\\s||?||.]+', "i");
    if (m.test(threads[i].getMessages()[0].getReplyTo()) || m.test(threads[i].getMessages()[0].getFrom()) || m.test(threads[i].getMessages()[0].getPlainBody()) || m.test(threads[i].getMessages()[0].getBcc()) || m.test(threads[i].getMessages()[0].getCc()) || m.test(threads[i].getMessages()[0].getSubject()) || m.test(threads[i].getMessages()[0].getBody()))
      threads[i].addLabel(GmailApp.getUserLabelByName('mess'));

    var f = new RegExp('food', "i");
    if (f.test(threads[i].getMessages()[0].getReplyTo()) || f.test(threads[i].getMessages()[0].getFrom()) || f.test(threads[i].getMessages()[0].getPlainBody()) || f.test(threads[i].getMessages()[0].getBcc()) || f.test(threads[i].getMessages()[0].getCc()) || f.test(threads[i].getMessages()[0].getSubject()) || f.test(threads[i].getMessages()[0].getBody()))
      threads[i].addLabel(GmailApp.getUserLabelByName('mess'));

    var ldh=new RegExp('[\\s]+ldh[\\s||?||.]+',"i");
    if (ldh.test(threads[i].getMessages()[0].getPlainBody()) || ldh.test(threads[i].getMessages()[0].getSubject()))
      threads[i].addLabel(GmailApp.getUserLabelByName('mess'));
    var udh=new RegExp('[\\s]+udh[\\s||?||.]+',"i");
    if (udh.test(threads[i].getMessages()[0].getPlainBody()) || udh.test(threads[i].getMessages()[0].getSubject()))
      threads[i].addLabel(GmailApp.getUserLabelByName('mess'));
  }
}

function assignhosteloffice() {
  // Label related to Hostel Office
  var threads = GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var message = threads[i].getMessages()[0];
    var hostel = new RegExp("hostel","i");
    if (message.getReplyTo() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>' || message.getTo() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>' || message.getFrom() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>' || message.getCc() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>' || message.getBcc() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>'||hostel.test(message.getSubject()))
      threads[i].addLabel(GmailApp.getUserLabelByName("Hostel Related"));
  }
}

function assignfoundlost() {
  // Check whether mail Subject has Lost  or Found and label accordingly 
  var threads = GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var l = new RegExp('\\blost\\b', "i");
    if (l.test(threads[i].getMessages()[0].getSubject()))
      threads[i].addLabel(GmailApp.getUserLabelByName('Found and Lost'));

    var f = new RegExp('\\bfound\\b', "i");
    if (f.test(threads[i].getMessages()[0].getSubject()))
      threads[i].addLabel(GmailApp.getUserLabelByName('Found and Lost'));
  }
}

function assignintern() {
  var threads = GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var f = new RegExp('internship', "i");
    if (f.test(threads[i].getMessages()[0].getReplyTo()) || f.test(threads[i].getMessages()[0].getFrom()) || f.test(threads[i].getMessages()[0].getPlainBody()) || f.test(threads[i].getMessages()[0].getBcc()) || f.test(threads[i].getMessages()[0].getCc()) || f.test(threads[i].getMessages()[0].getSubject()) || f.test(threads[i].getMessages()[0].getBody()))
      threads[i].addLabel(GmailApp.getUserLabelByName('Interns Related'));
  }
}
