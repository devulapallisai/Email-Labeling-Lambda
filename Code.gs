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
}

function clubsLabels() {
  GmailApp.createLabel("clubs");
  for (i = 0; i < sublabels.length; i++) {
    GmailApp.createLabel(`clubs/${sublabels[i]}`);
  }
  // creating label named clubs and then creating sublabels i.e clubs
}

function general() {
  GmailApp.createLabel("Office of Career services");
  GmailApp.createLabel("mess");
  GmailApp.createLabel("Hostel Office");
  GmailApp.createLabel("Found and Lost");
  GmailApp.createLabel('sports');
  GmailApp.createLabel('Interns Related');
  GmailApp.createLabel("General");
  GmailApp.createLabel("Seminars and Colloquium");
  // Here we are creating general labels like Hostel office, Mess, Found and Lost, Sports, Internship related
}

function assignSeminar(){
  var threads=GmailApp.getInboxThreads();
  for(i=0;i<threads.length;i++){
    var seminar=new RegExp("seminar","i");
    // adding labels for seminars and Colloquium announcements 
    if(seminar.test(threads[i].getMessages()[0].getFrom())||seminar.test(threads[i].getMessages()[0].getPlainBody())){
      GmailApp.createLabel("Seminars and Colloquium")
    }
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
    var s = new RegExp('sport', "i");
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

    var m = new RegExp('mess menu', "i");
    if (m.test(threads[i].getMessages()[0].getReplyTo()) || m.test(threads[i].getMessages()[0].getFrom()) || m.test(threads[i].getMessages()[0].getPlainBody()) || m.test(threads[i].getMessages()[0].getBcc()) || m.test(threads[i].getMessages()[0].getCc()) || m.test(threads[i].getMessages()[0].getSubject()) || m.test(threads[i].getMessages()[0].getBody()))
      threads[i].addLabel(GmailApp.getUserLabelByName('mess'));

    var f = new RegExp('food', "i");
    if (f.test(threads[i].getMessages()[0].getReplyTo()) || f.test(threads[i].getMessages()[0].getFrom()) || f.test(threads[i].getMessages()[0].getPlainBody()) || f.test(threads[i].getMessages()[0].getBcc()) || f.test(threads[i].getMessages()[0].getCc()) || f.test(threads[i].getMessages()[0].getSubject()) || f.test(threads[i].getMessages()[0].getBody()))
      threads[i].addLabel(GmailApp.getUserLabelByName('test'));

  }
}

function assignhosteloffice() {
  // Label related to Hostel Office
  var threads = GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var message = threads[i].getMessages()[0];
    var hostel = new RegExp("hostel","i");
    if (message.getReplyTo() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>' || message.getTo() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>' || message.getFrom() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>' || message.getCc() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>' || message.getBcc() === 'Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>'||hostel.test(message.getSubject()))
      threads[i].addLabel(GmailApp.getUserLabelByName("Hostel Office"));
  }
}

function assignfoundlost() {
  // Check whether mail Subject has Lost  or Found and label accordingly 
  var threads = GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var l = new RegExp('lost', "i");
    if (l.test(threads[i].getMessages()[0].getSubject()))
      threads[i].addLabel(GmailApp.getUserLabelByName('Found and Lost'));

    var f = new RegExp('found', "i");
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
