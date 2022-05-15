var sublabels = ["kludge", "Lambda", "Elektronica", "Epoch", "vibes", "RangdeManch", "litsoc", "Infero", "shuffle", "Robotix", "Torque", "Aero", "Prakriti"]

// change the clubs here for making new clubs labels(these are sublabels pf label named clubs)

var readorNot = "";

// All main labels are listed down and add labels you want 
var labels = ["Office of Career services", "mess", "Hostel Related", "Found and Lost", "sports", "Interns Related", "General", "Seminars and Colloquium", "New joining", "Viva voice", "Academics", "Academics/Grade cards", "Academics/Exams", "Director", "Industry Lecture series", "Google classroom", "Announcements", "clubs", "General/Surveys", "General/Cab Sharing", "General/Mess swap"];


function doGet(e) {
  try {
    readorNot = e.parameters["readData"][0];
  }
  catch {
    readorNot = "false"
  }
  return HtmlService.createTemplateFromFile('Index').evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function start() {
  Logger.log(readorNot)

  // Here we have start of the function let we use it as main() in C and all functions to be executed must be in this function to be called for eg: func() in this

  // deletealllabels(GmailApp.getUserLabels());
  
  labels.map((item) => {
    // Creating Labels
    if (item != "clubs") {
      GmailApp.createLabel(item);
    } else {
      GmailApp.createLabel(item);
      for (i = 0; i < sublabels.length; i++) {
        GmailApp.createLabel(`clubs/${sublabels[i]}`);
      }
    }
  })

  // Assigning the labels

  assignLabels();

}

function assignLabels() {
  var threads = GmailApp.getInboxThreads();
  for (i = 0; i < threads.length; i++) {
    var message = threads[i].getMessages()[0];
    if (message.getFrom() == "Director IIT Hyderabad <director@iith.ac.in>") {
      threads[i].addLabel(GmailApp.getUserLabelByName("Director"));
    }
    // Assigning classroom or lecture labels
    assignClassroomorLecture(message, "@classroom.google.com", "Google classroom", threads[i])
    assignClassroomorLecture(message, "industry.lecture", "Industry Lecture series", threads[i])
    assignAnnouncementsorOcs(message, "announcement", "Announcements", threads[i])
    assignAnnouncementsorOcs(message, "office.placement", "Office of Career services", threads[i])
    assignSeminar(message, threads[i])
    assignAcademics(message, threads[i])
    assignVivavoiceandNewjoins(message, "viva", "Viva voice", threads[i])
    assignVivavoiceandNewjoins(message, "new joining", "New joining", threads[i])
    assignGeneral(message, threads[i])
    assignclublabel(message, threads[i])
    assignsports(message,threads[i])
    assignmess(message,threads[i]) 
    assignhosteloffice(message,threads[i])
    assignintern(message,threads[i])
  }
}

function assignClassroomorLecture(message, key, label, thread) {
  if (message.getFrom().includes(key)) {
    thread.addLabel(GmailApp.getUserLabelByName(label));
  }
}

function assignAnnouncementsorOcs(message, key, label, thread) {
  var ann = new RegExp(key, "i");
  if (
    ann.test(message.getReplyTo()) ||
    ann.test(message.getTo()) ||
    ann.test(message.getFrom()) ||
    ann.test(message.getCc()) ||
    ann.test(message.getBcc())
  )
    thread.addLabel(
      GmailApp.getUserLabelByName(label)
    );
}

function assignSeminar(message, thread) {

  var seminar = new RegExp("seminar", "i");
  var coll = new RegExp("colloquium", "i");
  // adding labels for seminars and Colloquium announcements
  if (
    seminar.test(message.getFrom()) ||
    coll.test(message.getSubject())
  ) {
    thread.addLabel(
      GmailApp.getUserLabelByName("Seminars and Colloquium")
    );
  }
  if (readorNot === "true") {
    if (seminar.test(message.getPlainBody())) {
      thread.addLabel(
        GmailApp.getUserLabelByName("Seminars and Colloquium")
      );
    }
  }
}

function assignAcademics(message, thread) {
  var grade = new RegExp("grade", "i");
  var card = new RegExp("card", "i");
  var acad = new RegExp("academic", "i");
  var course = new RegExp("course", "i");
  var exam = new RegExp("\\bexam\\b", "i");
  var paper = new RegExp("question paper", "i");
  var viva = new RegExp("viva", "i");
  // adding labels for seminars and Colloquium announcements
  if (
    grade.test(message.getSubject()) &&
    card.test(message.getSubject())
  ) {
    thread.addLabel(GmailApp.getUserLabelByName("Academics/Grade cards"));
  }
  if (acad.test(message.getFrom())) {
    thread.addLabel(GmailApp.getUserLabelByName("Academics"));
  }
  if (readorNot === "true") {
    if (course.test(message.getPlainBody())) {
      thread.addLabel(GmailApp.getUserLabelByName("Academics"));
    }
  }
  if (
    paper.test(message.getSubject()) ||
    (exam.test(message.getSubject()) &&
      !viva.test(message.getSubject()))
  ) {
    thread.addLabel(GmailApp.getUserLabelByName("Academics/Exams"));
  }
  if (readorNot === "true") {
    if (
      paper.test(message.getPlainBody()) ||
      exam.test(message.getPlainBody())
    ) {
      thread.addLabel(GmailApp.getUserLabelByName("Academics/Exams"));
    }
  }
}

function assignVivavoiceandNewjoins(message, key, label, thread) {
  var viva = new RegExp(key, "i");
  if (viva.test(message.getSubject()))
    thread.addLabel(GmailApp.getUserLabelByName(label));
}

function assignGeneral(message, thread) {
  // adding cab sharing and mess swap also surveys for projects labels
  var cab = new RegExp("cab", "i");
  var swap = new RegExp("mess swap", "i");
  var survey = new RegExp("survey", "i");
  if (cab.test(message.getSubject())) {
    thread.addLabel(GmailApp.getUserLabelByName("General/Cab Sharing"));
  }
  if (swap.test(message.getSubject())) {
    thread.addLabel(GmailApp.getUserLabelByName("General/Mess swap"));
  }
  if (survey.test(message.getSubject())) {
    thread.addLabel(GmailApp.getUserLabelByName("General/Surveys"));
  }
  // reading body to do stuff
  if (readorNot === "true") {
    if (cab.test(message.getPlainBody())) {
      thread.addLabel(GmailApp.getUserLabelByName("General/Cab Sharing"));
    }
    if (swap.test(message.getPlainBody())) {
      thread.addLabel(GmailApp.getUserLabelByName("General/Mess swap"));
    }
  }
}

function assignclublabel(message, thread) {
  for (j = 0; j < sublabels.length; j++) {
    var s = new RegExp(sublabels[j], "i");
    if (
      s.test(message.getReplyTo()) ||
      s.test(message.getFrom())
    ) {
      thread.addLabel(
        GmailApp.getUserLabelByName(`clubs/${sublabels[j]}`)
      );
      thread.addLabel(GmailApp.getUserLabelByName("clubs"));
    }
  }
  // assigning club labels including sublabels
}

function assignsports(message,thread) {
  // Assigning sports labels

  var s = new RegExp("\\bsport\\b", "i");
  var t = new RegExp("tournament", "i");
  var co = new RegExp("court", "i");
  var fo = new RegExp("food court", "i");
  // we should look for [sport] court but not food court as keyword so
  var g = new RegExp("ground", "i");
  if (
    s.test(message.getReplyTo()) ||
    s.test(message.getFrom()) ||
    g.test(message.getSubject()) ||
    (co.test(message.getSubject()) &&
      !fo.test(message.getSubject())) ||
    s.test(message.getBcc()) ||
    s.test(message.getCc()) ||
    s.test(message.getSubject())
  ) {
    thread.addLabel(GmailApp.getUserLabelByName("sports"));
  }
  if (readorNot === "true") {
    if (
      (s.test(message.getPlainBody()) &&
        t.test(message.getPlainBody())) ||
      s.test(message.getPlainBody())
    ) {
      thread.addLabel(GmailApp.getUserLabelByName("sports"));
    }
  }
}

function assignmess(message,thread) {
  // adding mess label based on mess menu nd food keywords

    if (
      message.getReplyTo() ===
        "Mess Secretary <mess_secya@gymkhana.iith.ac.in>" ||
      message.getTo() === "Mess Secretary <mess_secya@gymkhana.iith.ac.in>" ||
      message.getFrom() === "Mess Secretary <mess_secya@gymkhana.iith.ac.in>" ||
      message.getCc() === "Mess Secretary <mess_secya@gymkhana.iith.ac.in>" ||
      message.getBcc() === "Mess Secretary <mess_secya@gymkhana.iith.ac.in>"
    )
      threads[i].addLabel(GmailApp.getUserLabelByName("mess"));

    var m = new RegExp("[\\s]+mess[\\s||?||.]+", "i");
    if (
      m.test(message.getReplyTo()) ||
      m.test(message.getFrom()) ||
      m.test(message.getBcc()) ||
      m.test(message.getCc()) ||
      m.test(message.getSubject())
    )
      threads[i].addLabel(GmailApp.getUserLabelByName("mess"));

    var f = new RegExp("food", "i");
    if (
      f.test(message.getReplyTo()) ||
      f.test(message.getFrom()) ||
      f.test(message.getBcc()) ||
      f.test(message.getCc()) ||
      f.test(message.getSubject())
    )
      thread.addLabel(GmailApp.getUserLabelByName("mess"));

    var ldh = new RegExp("[\\s]+ldh[\\s||?||.]+", "i");
    var udh = new RegExp("[\\s]+udh[\\s||?||.]+", "i");
    if (
      ldh.test(message.getSubject()) ||
      udh.test(message.getSubject())
    )
      threads[i].addLabel(GmailApp.getUserLabelByName("mess"));
    if (readorNot === "true") {
      if (
        udh.test(message.getPlainBody()) ||
        ldh.test(
          thread.getMessages()[0].getPlainBody() ||
            f.test(message.getPlainBody()) ||
            m.test(message.getPlainBody())
        )
      ) {
        thread.addLabel(GmailApp.getUserLabelByName("mess"));
      }
    }
}

function assignhosteloffice(message,thread) {
  // Label related to Hostel Office
    var hostel = new RegExp("hostel", "i");
    if (
      message.getReplyTo() ===
        "Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>" ||
      message.getTo() ===
        "Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>" ||
      message.getFrom() ===
        "Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>" ||
      message.getCc() ===
        "Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>" ||
      message.getBcc() ===
        "Hostel Office IIT Hyderabad <office.hostel@iith.ac.in>" ||
      hostel.test(message.getSubject())
    )
      thread.addLabel(GmailApp.getUserLabelByName("Hostel Related"));
}

function assignfoundlost(message,thread) {
  // Check whether mail Subject has Lost  or Found and label accordingly
    var l = new RegExp("\\blost\\b", "i");
    if (l.test(message.getSubject()))
      thread.addLabel(GmailApp.getUserLabelByName("Found and Lost"));

    var f = new RegExp("\\bfound\\b", "i");
    if (f.test(message.getSubject()))
      thread.addLabel(GmailApp.getUserLabelByName("Found and Lost"));
}

function assignintern(message,thread) {
    var f = new RegExp("internship", "i");
    if (
      f.test(message.getReplyTo()) ||
      f.test(message.getFrom()) ||
      f.test(message.getBcc()) ||
      f.test(message.getCc()) ||
      f.test(message.getSubject())
    )
      thread.addLabel(GmailApp.getUserLabelByName("Interns Related"));
  }
  if (readorNot === "true") {
    if (f.test(message.getPlainBody())) {
      thread.addLabel(GmailApp.getUserLabelByName("Interns Related"));
    }
}
