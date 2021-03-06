$(function() {
    'use strict';

    var mygumi = {},
        variable = {};

    mygumi.init = function() {
        var essential = {id:1, title:2, price_pc:3, link:6, image_link:8, category_name1:10, shipping:42};
        var esIndexArray = [];

        for (var property in essential) {
            esIndexArray.push(essential[property]);
        }

        variable['esIndexArray'] = esIndexArray;
        variable['essential'] = essential;
        variable['uidArray'] = [];

        mygumi.event.autoEventFnc();

        mygumi.start();
    }

    mygumi.start = function() {
        var manualExecFnc = ['downloadTsvFile', 'saveTsvFile'];

        mygumi.async.readTsvFile(function(res) {

            mygumi.dom.createInitTable(res);

            mygumi.dom.firstRowSetting();

            mygumi.dom.titleColCreate('title');

            mygumi.event.manualEventFnc(manualExecFnc);
        });

    }

    mygumi.event = (function() {
        var event = {};

        event.autoEvent = {
            addRowEvent : function() {

                $('#addRow').on('click', function() {
//                        console.log("추가");
                    var uid = prompt('추가하실 행의 id 컬럼의 값을 입력하세요', '');

                    if (uid) {
                        var tr = document.createElement('tr');
                        tr.setAttribute('id', uid);

                        tr.appendChild(mygumi.dom.addRow(uid, true));

                        for (var i=1;i<variable['colNumber'];i++) {

                            tr.appendChild(mygumi.dom.addRow(''));

                        }

                        $('#table > table').append(tr);
//                            console.log("addRow");
                    }

                });
            },

            deleteRow : function() {

                $('#removeRow').on('click', function() {
//                        console.log('remove');
                    var uid = prompt('삭제하실 id 컬럼의 값을 입력하세요', '');
                    var uidRow = $('#' + uid);

                    if (uid) {
                        if (uidRow.attr('id') !== undefined) {

                            variable['uidArray'].splice($.inArray(uid, variable['uidArray']), 1);

                            uidRow.remove();
                        } else {
                            alert("id 컬럼의 값을 잘못 입력하셨습니다.");
                        }
                    }

                });

            },

            changeId : function() {

                $("#table").on('keydown, focusout', '#tsv tr td' ,function() {
                    var focusElement = $(this).find('.uid');

                    if (focusElement.attr('class') == 'uid') {
                        focusElement.parent().parent().attr('id', focusElement.val());
                    }

                })
            },

            additionTool : function() {

                $('#additionBtn').on('click', function() {
                    var $at = $('#additionTool');

                    $at.css('display') == 'none' ? $at.show() : $at.hide();

                });
            },

            additionToolAutoInsert : function() {

                $('#autoInsertBtn').on('click', function() {
                    var column = $('#autoInsert #column').val();
                    var text = $('#autoInsert #text').val();

                    certainAutoInsert(column, text);
                });
            },

            scrollAutoDisplay : function () {

                jQuery(document).bind('scroll.row', function() {
                    var target = '#tsv';

                    var mygumiTarget = jQuery(target).offset().top;

                    if (jQuery(document).scrollLeft() > $('#tsv tr td').width()) {

                        event.cssEvent.displayConvert('#fixTable', 'active');

                        $('#fixTable').css('left', jQuery(document).scrollLeft() + 'px');

                    } else {

                        event.cssEvent.displayConvert('#fixTable', 'inactive');

                    }

                    if (jQuery(document).scrollTop() > mygumiTarget) {

                        event.cssEvent.displayConvert('#firstRowArea', 'active');
//                            event.cssEvent.fixedSetting('#firstRowArea', 80);

                        $('#firstRowArea').css('top', jQuery(document).scrollTop() + $('#headButton').outerHeight() + 'px');


                    } else {

                        event.cssEvent.displayConvert('#firstRowArea', 'inactive');
//                            $('#firstRowArea').removeClass('fixed');

                    }

                });

            }

        }

        event.manualEvent = {
            downloadTsvFile : function() {

                $('#download').on('click', function() {
//                        console.log("download");

                    var tsvString = tsvArrayConvert();

                    if (typeof tsvString == 'undefined') {
                        alert("오류 발생. 오류 지점으로 자동으로 포커스가 이동됩니다.")
                        return false;
                    } else {
//                            console.log('download success');
                        tsvFileConvert(tsvString);
                    }

                });

            },

            saveTsvFile : function() {

                $('#tsvWrite').on('click', function() {
//                        console.log("save");

                    var tsvString = tsvArrayConvert();

                    if (typeof tsvString == 'undefined') {
                        alert("오류 발생. 오류 지점으로 자동으로 포커스가 이동됩니다.")
                        return false;
                    } else {
//                            console.log('write success');
                        mygumi.async.writeTsvFile(tsvString);
                    }

                });
            }

        }

        event.cssEvent = {
            displayConvert : function(tag, status) {

                if ($(tag).hasClass(status)) {
                    return;
                }

                var removeName = '';

                status == 'active'
                    ? removeName = 'inactive'
                    : removeName = 'active'

                $(tag).addClass(status);
                $(tag).removeClass(removeName);

            },

            fixedSetting : function(tag, top) {

                if ($(tag).hasClass('fixed')) {
                    return;
                } else {
                    $(tag).addClass('fixed');
                }

                if (typeof top != 'undefined') {
                    $(tag).css('top', top);
                }

            }
        }

        event.autoEventFnc = function() {
            var autoEventObj = event.autoEvent;

            for (var property in autoEventObj) {
                if (autoEventObj.hasOwnProperty(property)) {
                    autoEventObj[property].call();
                }
            }

        };

        event.manualEventFnc = function(array) {
            var manualEventObj = event.manualEvent;

            for (var i in array) {
                manualEventObj[array[i]].call();
            }

        };

        function tsvArrayConvert() {
            var tsvArray = new Array();
            var oTable = document.getElementById('tsv');

            //gets rows of table
            var rowLength = oTable.rows.length;

            //loops through rows
            for (var i = 0; i < rowLength; i++) {
                tsvArray[i] = new Array();

                //gets cells of current row
                var oCells = oTable.rows.item(i).cells;

                //gets amount of cells of current row
                var cellLength = oCells.length;

                //loops through each cell in current row
                for (var j = 0; j < cellLength; j++) {
                    /* get your cell info here */
                    var cellVal = oCells.item(j).getElementsByTagName("input")[0].value;

                    tsvArray[i][j] = cellVal;
                }
            }

            return tsvStringConvert(tsvArray);

        }

        function tsvStringConvert(array) {
            var arrayLen = array.length;
            var tsvText = "";

            for (var i=0;i<arrayLen;i++) {

                var row = array[i];
                var rowText = "";

                for (var index in row) {

                    rowText += row[index] + '\t';

                }

                var lastIndex = rowText.lastIndexOf('\t');
                rowText = rowText.substring(0, lastIndex);

                if (!mygumi.valid.essentialCheck(rowText, i)) {
//                        console.log('fail');
                    return;
                }

                tsvText += rowText + '\n';

            }

            lastIndex = tsvText.lastIndexOf('\n');
            tsvText = tsvText.substring(0, lastIndex);

            return tsvText;

        }

        function tsvFileConvert(tsvText) {
            var a = document.getElementById("a");
            var tsvFile = new Blob([tsvText], {type: 'text/plain'});
            a.href = URL.createObjectURL(tsvFile);
            a.download = 'navershopping.txt';
        }

        function certainAutoInsert(col, text) {

            var colIndex = getColIndex(col);

            var trArray = $('#tsv tr');
            trArray.splice(0,1);

            $.each(trArray, function(ii,vv) {

                var target = $(this).children('td')[colIndex].children;

                $(target).val(text);

            });

        }

        return event;
    }());

    mygumi.async = (function() {
        var async = {};

        async.readTsvFile = function(callback) {
            $.ajax({
                type: "GET",
                url: "/naver/navershopping.txt",
                dataType: "text",
                success: function(str) {
                    var item = str.split('\n');

                    for (var i=0; i<item.length; i++) {
                        var columnValue = item[i].split('\t');
                        item[i] = columnValue;
                    }

                    variable['colNumber'] = item[0].length;
                    variable['rowNumber'] = item.length;

                    if (typeof(callback) == 'function') {
                        callback(item);
                    }

                }
            });
        }

        async.writeTsvFile = function(str) {
            $.ajax({
                type: "POST",
                url: "/naver/upload.php",
                dataType: "text",
                data: "dataString=" + str,
                success: function(data) {
                    alert(data);
                },
                error:function(request,status,error){
//                        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
        }

        return async;
    }());

    mygumi.valid = (function() {
        var valid = {};

        valid.essentialCheck = function(str, row) {
            // console.log('essentialCheck');
            var esIndexArray = variable['esIndexArray'];

            var item = str.split('\t');
            var itemLength = item.length;

            for (var i=0;i<itemLength;i++) {
                if (item[i] == '' && esIndexArray.indexOf(i+1) > -1) {
//                        console.log('공백 행 : ' + (row+1) + '공백 열 : ' + (i+1));

                    moveFocus(row, i, '#tsv tr', 'td input');

                    return false;
                }
            }

            return true;
        }

        function moveFocus(row, col, rowTag, colTag) {
            var row = $(rowTag)[row];

            $(row).find(colTag)[col].focus();
        }

        return valid;
    }());

    mygumi.dom = (function() {
        var dom = {};

        dom.createInitTable = function(tsv) {
            var array = tsv;
            var arrayLength = array.length;
            var theTable = document.createElement('table');
            theTable.setAttribute('id', 'tsv');
            theTable.setAttribute('class', 'tsvTable');

            for (var i=0;i<arrayLength;i++) {

                var tr = document.createElement('tr');
                tr.setAttribute('id', array[i][0]);

                $.each(array[i], function(index, value) {

                    variable['uidArray'].push(value);
                    tr.appendChild(dom.addRow(value, index == 0));
                });

                theTable.appendChild(tr);
            }

            document.getElementById('table').appendChild(theTable);
        }

        dom.addRow = function(value, add) {
            // param - value, (class="uid")

            var td = document.createElement('td');
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("value", value);

            if (value != '' && add) {
                input.setAttribute('class', 'uid');
                variable['uidArray'].push(value);
            }

            td.appendChild(input);

            return td;
        }

        dom.firstRowSetting = function() {
            var es = variable['essential'],
                firstRow =  $('#id td input');

            $.each(firstRow, function(i) {
                var value = $(this).val();

                if (es.hasOwnProperty(value)) {
                    $(this).addClass('essential');
                }

                $(this).addClass(value);
                $(this).addClass('^' + i);
                $(this).attr('readonly', 'readonly');

            });

            dom.firstRowCreate();

        }

        dom.firstRowCreate = function() {
            var fixFirstRowArea = "";

            fixFirstRowArea += "<div id='firstRowArea' class='inactive'>";
            fixFirstRowArea += "    <table id='firstRowTable'>";
            fixFirstRowArea += "    </table>";
            fixFirstRowArea += "</div>";

            $('body').prepend(fixFirstRowArea);

            $('#firstRowTable').append($('#tsv tr').first().html());

        }

        dom.titleColCreate = function(col) {
            var fixColArea = "",
                fixTds = "";

            fixColArea += "<table id='fixTable' class='tsvTable inactive'>";
            fixColArea += "</table>";

            $('#table').append(fixColArea);

            $('.tsvTable').append();

            var colIndex = getColIndex(col);

            var trArray = $('#tsv tr');

            $.each(trArray, function(ii,vv) {

                var target = $(this).children('td')[colIndex].children;
                fixTds += "<tr><td><input readonly='readonly' value='" + $(target).val() + "'></td></tr>"

            });

            $('#fixTable').append(fixTds);

        }

        return dom;

    }());

    function getColIndex (col) {
        var col = $('#tsv tr .' + col).attr("class");

        if (typeof col == 'undefined') {
            alert("올바르지 않은 컬럼 값입니다.");
            return false;
        }

        var array = col.split(' ');
        var colIndex;

        $.each(array,function(i,v) {
            if (v.indexOf('^') > -1) {
                colIndex = array[i].slice(1);

            }
        })
        return colIndex;
    }

    mygumi.init();

})