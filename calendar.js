function doGet(e) {
    var cal = CalendarApp.getCalendarById('icegouse@gmail.com');
    if (cal == undefined) {
      return ContentService.createTextOutput('Нет доступа к календарю');
    }
   
    const now = new Date();
    var start = new Date(); start.setHours(0, 0, 0);      // начало в полночь
    const oneday = 24*3600000;                            // Количество миллисекунд в сутках
    const stop = new Date(start.getTime() + 7 * oneday);
    
    var events = cal.getEvents(start, stop);
    var str = '';
    for (var ii = 0; ii < events.length; ii++) {
      var event=events[ii]; 
      var myStatus = event.getMyStatus(); 
      switch(myStatus) {
        case CalendarApp.GuestStatus.OWNER:
        case CalendarApp.GuestStatus.YES:
        case CalendarApp.GuestStatus.MAYBE:
          str += event.getStartTime() + '\t' +           // Время начала
                 event.isAllDayEvent() + '\t' +          // Весь день или часть дня TRUE или FALSE
                 event.getPopupReminders()[0] + '\t' +   // Время напоминания
                 event.getTitle() +'\n';                 // Название мероприятия
          break;
        default:
          break;
      }
    }
    return ContentService.createTextOutput(str);
  }