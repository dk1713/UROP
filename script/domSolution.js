//Global Initial Parameters:
const initialPoint = [1, 1];
const layout = {
    width: 450, "height": 500,
    margin: {l:30, r:30, t:30, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-5, 5], zeroline: true, title: "x"},
    yaxis: {range: [-5, 5], zeroline: true, title: "y"},
    aspectratio: {x:1, y:1}
};
var currentPoint = initialPoint;
var initX = 0, initY = 0;
var isBlackText = false;

//Plot
/**
 * Resets and plots initial area element or basis vectors of 2D Cartesian.
 * @param {string} type - basis vectors or area element
 */
function initCarte(type) {
    Plotly.purge("graph");
    initX = currentPoint[0];
    initY = currentPoint[1];

    $("#xController").val(initX);
    $("#xControllerDisplay").text(initX);
    $("#yController").val(initY);
    $("#yControllerDisplay").text(initY);

    var x = parseFloat(document.getElementById('xController').value);
    var y = parseFloat(document.getElementById('yController').value);

    if (type === "#basis"){
        Plotly.newPlot("graph", computeBasis(x, y), layout);
    } else if (type === "#area"){
        Plotly.newPlot("graph", computeArea(x, y), layout);
    }
    return;
}
/**
 * Computes the basis vectors.
 * @param {float} x - x value.
 * @param {float} y - y value.
 */
function computeBasis(x, y) {
    currentPoint = [x, y];

    //This is how we first declare objects
    xVector = new Line2d([[x, y], [x+1, y]]);
    yVector = new Line2d([[x, y], [x, y+1]]);
    rectangle = new Rectangle(x,y);
    var data = [
        xVector.gObject(orange, 3),
        xVector.arrowHead(orange, 3),
        yVector.gObject(lilac, 3),
        yVector.arrowHead(lilac, 3),
        rectangle.gObject(),
    ];

    return data;
}
/**
 * Computes the area element.
 * @param {float} x - x value.
 * @param {float} y - y value.
 */
function computeArea(x, y) {
    currentPoint = [x, y];

    var data = [
        {
            type: "scatter",
            mode: "lines+text",
            x: [x, x+0.5, x+1],
            y: [y, y, y],
            line: {color: orange, width: 3, dash: "solid"},
            text: ["", "dx", ""],
            textfont: {color:orange, size:16}
        },
        {
            type: "scatter",
            mode: "lines+text",
            x: [x, x, x],
            y: [y, y+0.5, y+1],
            line: {color: lilac, width: 3, dash: "solid"},
            text: ["", "dy", ""],
            textfont: {color:lilac, size:16}
        },
        {
            type: "scatter",
            mode: "lines+text",
            x: [0, x/2, x],
            y: [0, y/2, y],
            line: {color: "rgb(0,0,0)", width: 2},
            text: ["", "ρ", ""],
            textfont: {color:black, size:15}
        },
        {
            type: "scatter",
            mode: "lines",
            x : [x,x+1,x+1,x,x],
            y : [y,y,y+1,y+1,y],
            line: {simplify: false, color: cyan},
            fill:'toself',
            opacity: 0.5
        }
    ];

    return data;
}

/** updates the plot according to the slider controls. */
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
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").text( $(this).val() + $("#"+$(this).attr("id") + "Display").attr("data-unit"));
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
            initCarte($('ul.tab-nav li a.active.button').attr('href')); // re-initialise with/out the black label

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

            initCarte(href); //re-initialise when tab is changed
            return false;
        });
    });

    //The First Initialisation - I use 's' rather than 'z' :p
    initCarte("#basis");
}
$(document).ready(main); //Load main when document is ready.