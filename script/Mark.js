//Global Initial Parameters:
var initialPoint = [1.5, 1.5];
var layout = {
    width: 450, "height": 500,
    margin: {l:30, r:30, t:30, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-5, 5], zeroline: true, title: "x"},
    yaxis: {range: [-5, 5], zeroline: true, title: "y"},
    aspectratio: {x:1, y:1}
};
var currentPoint = initialPoint;
var initialRho = 0, initialPhi = 0, initialR = 0, initialTheta = 0;
var isBlackText = false;
var blackTextType = "lines";


function initCartesian(type){

    console.log('hello world!');
    Plotly.purge("graph");
    initialX = initialPoint[0];
    initialY = initialPoint[1];

    var x = parseFloat(document.getElementById('xController').value);
    var y = parseFloat(document.getElementById('yController').value);
    //console.log(x,y);

    var data = [
        {
            type: "scatter",
        },
        {
            type: "scatter",

        },
        {
            type: "scatter",

        },
        {
            type: "scatter",

        },
        {
            type: "scatter",

        },
        {
            type: "scatter",
        },
        {
            type: "scatter",
        },
        {
            type: "scatter",
        },

        {
            type: "scatter",
        },

        {
            type: "scatter",
        },
        {
            type: "scatter",
        },

        {
            type: "scatter",
        },
        {
            type: "scatter",
        },
    ];

    if (type === "#basis"){
        Plotly.newPlot("graph", data, layout);
    } else if (type === "#area"){
        Plotly.newPlot("graph", data, layout);
    }
};


function computeBasis(x, y) {

    currentPoint = [x, y];

    xLine = new Line2d([[x, y], [x+1, y]]);
    yLine = new Line2d([[x, y], [x, y+1]]);

    dominic = new Rectangle(x, y,0,0);

    circle = new Circle(1);

    dominic = new Rectangle(x, y,0,0);
    var r = Math.sqrt(x**x + y**y)/5
    circle = new Circle(r);
    var phi1 = Math.atan2(y,x);
    var phi2 = phi1;
    var x_phi = r * Math.cos(phi2);
    var y_phi = r*Math.sin(phi2);
    var signx = Math.sign(x);
    var signy = Math.sign(y);

    var data = [
        {
            type: "scatter",
            mode: "lines",
            x: [0, x],
            y: [0, y],
            line: {color: black, width: 2}
        },

            xLine.gObject(impBlue, 3),
            xLine.arrowHead(impBlue, 3),
            yLine.gObject("rgb(200,0,0)", 3),
            yLine.arrowHead("rgb(200,0,0)", 3),
            dominic.gObject()
            //circle.gObject();

        ,
        /*
        {
            type: "scatter",
            mode: "text",
            x: [0.5*x, 0.5*x, 0.5*x],
            y: [y-0.5, y-0.5, y-0.5],
            line: {color: orange, width: 3, dash: "solid"},
            text: ["", "ρ", ""],
            textfont: {color: green, size:16}
        }
        ,
        */
        {
            type: "scatter",
            mode: "text",
            x: [x, x+0.5, x+1],
            y: [y-0.4, y-0.3, y-0.4],
            line: {color: orange, width: 3, dash: "solid"},
            text: ["", "î", ""],
            textfont: {color: impBlue, size:16}
        }
        ,

        {
            type: "scatter",
            mode: "text",
            x: [x-0.4, x-0.4, x-0.4],
            y: [y, y+0.5, y+1],
            line: {color: orange, width: 3, dash: "solid"},
            text: ["", "ĵ", ""],
            textfont: {color: "rgb(200,0,0)", size:16}

        }

        ,
        /*
        {
            type: "scatter",
            mode: "text",
            x: [r*Math.cos(phi2),Math.signx * r*Math.cos(phi2), r*Math.cos(phi2)],
            y: [r*Math.sin(phi2),Math.signy * r*Math.sin(phi2), r*Math.sin(phi2)],
            line: {color: orange, width: 3, dash: "solid"},
            text: ["", "φ", ""],
            textfont: {color: green, size:16}

        }
        */
        ,
        {
            type: "scatter",
            mode: "text",
            x: [x+0.6, x+0.6,x+0.6],
            y: [y+0.5, y+0.5, y+0.5],
            line: {color: orange, width: 3, dash: "solid"},
            text: ["", "(x,y)", ""],
            textfont: {color:  black, size:16}

        }
        ,
        {
            type: "scatter",
            mode: "circle",
            x: [x,x,x],
            y: [y,y,y],
            circle: {color: orange, width: 3, dash: "solid"},
            text: ["", "", ""],
            textfont: {color: orange, size:16}
        }


        ,
    ];


    return data
}

function computeArea(x, y) {
    currentPoint = [x,y];
    xLine = new Line2d([[x, y], [x+1, y]]);
    yLine = new Line2d([[x, y], [x, y+1]]);
    dominic = new Rectangle(x, y, x+1, y+1);


    dominic = new Rectangle(x, y,x+1,y+1);
    var r = Math.sqrt(x**x + y**y)/5
    circle = new Circle(r);

    var phi1 = Math.atan2(y,x);
    var phi2 = phi1;
    var x_phi = r * Math.cos(phi2);
    var y_phi = r*Math.sin(phi2);
    var signx = Math.sign(x);
    var signy = Math.sign(y);
    //var dxText = emptyText.slice();
    //dxText[x] = "dx";
    rholine = new Line2d(([0,0], [x,y]))


    var point = new Circle(0.5);


    var data = [
        /*
        {
            type: "scatter",
            mode: "lines",
            x: [0, x],
            y: [0, y],
            line: {color: black, width: 2}
        },
        */


            xLine.gObject(impBlue, 3),
            xLine.arrowHead(impBlue, 3),
            yLine.gObject("rgb(200,0,0)", 3),
            yLine.arrowHead("rgb(200,0,0)", 3),
            //rholine.gObject(black, 3),
            //rholine.arrowHead(black, 3),
            dominic.gObject()
         ,

         {
            type: "scatter",
            mode: "text",
            x: [x, x+0.5, x+1],
            y: [y-0.2, y-0.2, y-0.2],
            line: {color: impBlue, width: 3, dash: "solid"},
            text: ["", "dx", ""],
            textfont: {color: impBlue, size:16}
         }
        ,

         {
            type: "scatter",
            mode: "text",
            x: [x-0.4, x-0.4, x-0.4],
            y: [y, y+0.5, y-+1],
            line: {color: lilac, width: 3, dash: "solid"},
            text: ["", "dy", ""],
            textfont: {color: "rgb(200,0,0)", size:16}
         }
        ,
        /*
        {
            type: "scatter",
            mode: "text",
            x: [r*Math.cos(phi2),signx * r*Math.cos(phi2), r*Math.cos(phi2)],
            y: [r*Math.sin(phi2),signy * r*Math.sin(phi2), r*Math.sin(phi2)],
            line: {color: orange, width: 3, dash: "solid"},
            text: ["", "φ", ""],
            textfont: {color: green, size:16}

        }
        */

        ,
        {
            type: "scatter",
            mode: "text",
            x: [x+0.5, x+0.5,x+0.5],
            y: [y+0.5, y+0.5, y+0.5],
            line: {color: black, width: 3, dash: "solid"},
            text: ["", "dA", ""],
            textfont: {color: black, size:16}

        }
        /*
        ,
        {
            type: "scatter",
            mode: "text",
            x: [0.5*x, 0.5*x, 0.5*x],
            y: [y-0.5, y-0.5, y-0.5],
            line: {color: orange, width: 3, dash: "solid"},
            text: ["", "ρ", ""],
            textfont: {color: "rgb(200,0,0)", size:16}
        }
        */
        ,
        {
            type: "scatter",
            mode: "circle",
            x: [x,x,x],
            y: [y,y,y],
            circle: {color: orange, width: 3, dash: "solid"},
            text: ["", "HELLO", ""],
            textfont: {color:orange, size:16}
        }
        ,
    ]


    return data
}




function updatePlot() {
    var data = [];
    // NB: updates according to the active tab
    var href = $('ul.tab-nav li a.active.button').attr('href'); // finds out which tab is active

    var x = parseFloat(document.getElementById('xController').value);
    var y = parseFloat(document.getElementById('yController').value);

    if (href === "#basis") {
        data = computeBasis(x, y);
    } else if (href === "#area") {
        data = computeArea(x, y);
    }

    Plotly.animate(
        'graph',
        {data: data},
        {
            fromcurrent: true,
            transition: {duration: 0,},
            frame: {duration: 0, redraw: false,},
            mode: "afterall"
        }
    );

    }




function main() {
    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input[type=range]").each(function () {
        var displayEl;
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").text( $(this).val() + $("#"+$(this).attr("id") + "Display").attr("data-unit") );

            //To display angle in degree
            $("#"+$(this).attr("id") + "DisplayA2").text($(this).val() + $("#" + $(this).attr("id") + "DisplayA2").attr("data-unit") );
            /*
            //To display the angle in radian in terms of fraction multiple of pi
            if (parseFloat($(this).val())*8 % 8 === 0.0) {
                displayEl = $(this).val();
            } else if (parseFloat($(this).val())*8 % 4 === 0.0) {
                displayEl = "(" + $(this).val()*2 + "/2)";
            } else if (parseFloat($(this).val())*8 % 2 === 0.0) {
                displayEl = "(" + $(this).val()*4 + "/4)";
            } else {
                displayEl = "(" + $(this).val()*8 + "/8)";
            }
            */

            $("#"+$(this).attr("id") + "DisplayA1").text($(this).val() + $("#" + $(this).attr("id") + "DisplayA1").attr("data-unit") );
            //NB: Display values are restricted by their definition in the HTML to always display nice number.

            updatePlot(); //Updating the plot is linked with display (Just My preference)
        });

    });

    /*Checkbox*/
    $("input[type=checkbox]").each(function () {
        $(this).on("change", function() {
            isBlackText = !isBlackText;
            if (isBlackText) {
                blackTextType = "lines+text";
            } else {
                blackTextType = "lines";
            }
            initPolar($('ul.tab-nav li a.active.button').attr('href')); // re-initialise with/out the black label

        });
    });

    /*Tabs*/
    $(function() {
        $('ul.tab-nav li a.button').click(function() {
            var href = $(this).attr('href');
            $('li a.active.button', $(this).parent().parent()).removeClass('active');
            $(this).addClass('active');
            $('.tab-pane.active', $(href).parent()).removeClass('active');
            $(href).addClass('active');

            initCartesian(href); //re-initialise when tab is changed
            updatePlot();
            return false;
        });
    });

    //The First Initialisation - I use 's' rather than 'z' :p
    initCartesian("#basis");
}
$(document).ready(main); //Load main when document is ready.