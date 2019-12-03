#! /usr/bin/env node

// console.log(1)



// setInterval(screen.render(),1000)



function Cpu(){
    var _ = require('lodash');
var ps = require('current-processes');

ps.get(function (err, processes) {

    var sorted = _.sortBy(processes, 'cpu');
    var top5 = sorted.reverse().splice(0, 5);




    var blessed = require('blessed')
        , contrib = require('blessed-contrib')
        , screen = blessed.screen()
        , line = contrib.line(
            {
                style:
                {
                    line: "yellow"
                    , text: "green"
                    , baseline: "black"
                }
                , xLabelPadding: 3
                , xPadding: 5
                , label: 'Title'
            })
        , data = {
            x: top5.map(item=>item.name),
            y: top5.map(item=>item.cpu)
        }
    screen.append(line)
    line.setData([data])

    screen.key(['escape', 'q', 'C-c'], function (ch, key) {
        return process.exit(0);
    });
    screen.render()
});
}
setInterval(Cpu, 1000);

Cpu()
