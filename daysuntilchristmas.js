class ChristmasWidget {
    run() {
        let widget = this.deployWidget();
        if (!config.runsInWidget) {
            widget.presentSmall();
        }
        Script.setWidget(widget);
        Script.complete();
    }
    
    deployWidget() {
        // 👩🏻|12-29|Her Birthday|🌷🎁🎂♥️
        let params = (args.widgetParameter || "").split("|");
        let icon = params[0] || "🎅🏻";
        let date = (params[1] || "12-25").split("-");
        let event = params[2] || params[1] || "Christmas";
        let emoji = params[3] || "🎄🎄🎄🎄";
        
        let list = new ListWidget();
        list.setPadding(12, 12, 12, 12);
        
        let titleTxt = list.addText(icon + " Countdown\nUntil " + event);
        titleTxt.font = Font.mediumSystemFont(13);
        
        list.addText("");
        
        let daysLeft = this.calculateDaysLeft(date);
        let daysLeftTxt = list.addText(daysLeft + " Days");
        daysLeftTxt.textColor = this.decideDisplayColor(daysLeft);
        daysLeftTxt.font = Font.boldSystemFont(24);
        
        list.addText("");
        
        let treeBottomLine = list.addText(emoji);
        treeBottomLine.font = Font.boldSystemFont(24);
        
        return list;
    }
    
    calculateDaysLeft(date) {
        let today = new Date(Date.now());
        let christmas = new Date(Date.now());
        christmas.setMonth(Number(date[0]) - 1);
        christmas.setDate(Number(date[1]) - 1);
        
        // check if we need to use christmas next year
        if (today.getMonth() > christmas.getMonth()
            || (today.getMonth() === christmas.getMonth() && today.getDate() > christmas.getDate())) {
            let nextYear = christmas.getFullYear();
            nextYear = nextYear + 1;
            christmas.setFullYear(nextYear);
        }
        
        christmas = christmas.getTime();
        today = today.getTime();
        
        let convertInDays = 24*3600*1000;
        return parseInt((christmas - today)/convertInDays);
    }
    
    decideDisplayColor(daysLeft) {
        if (daysLeft >= 50) {
            return Color.red();
        }
        
        if (daysLeft >= 30) {
            return Color.yellow();
        }
        
        return Color.purple();
    }
}

new ChristmasWidget().run();

