function showAnnualData(data)
{
    $('.text-holder').each(function()
    {
        var $this = $(this);
        var id = $this.data('id');
        var idPath = id.split('.');
        var dataProp = data;
        for(var i = 0; i < idPath.length; ++i)
        {
            dataProp = dataProp[idPath[i]];
        }
        $this.text(dataProp);
    });

    var $projectsTableRows = $('<tbody></tbody>');
    $.each(data.projectsList, function(index)
    {
        var project = data.projectsList[index];
        $projectsTableRows.append(
        [
            '<tr>',
              '<td class="col-name">' + project.name + '</td>',
              '<td class="col-storyCount">' + project.storyCount + '</td>',
              '<td class="col-taskCount">' + project.taskCount + '</td>',
              '<td class="col-bugCount">' + project.bugCount + '</td>',
            '</tr>'
        ].join(''));
    });
    $('#projectsTable').empty().append($projectsTableRows);

    var $projectsSummaryChart = $('#projectsSummaryChart');
    var pieChart = $projectsSummaryChart.data('pieChart');
    while(pieChart.segments.length) pieChart.removeData();
    var pieChartLabels = $projectsSummaryChart.data('labels').split(',');
    var pieChartColors = ['#0068B7', '#1aa1e6', '#81cef2'];
    $.each(['finishProjects', 'activateProjects', 'suspendProjects'], function(index, name)
    {
        pieChart.addData({color: pieChartColors[index], name: pieChartLabels[index], value: data[name]});
    });
}

$(function()
{
    var $main = $('#main');
    var ajustPosition = function()
    {
        $main.css(
        {
            posotion: 'absolute',
            top: Math.floor(($(window).height() - $main.outerHeight()) / 2),
            left: Math.floor(($(window).width() - $main.outerWidth()) / 2),
        });
    };
    ajustPosition();
    $(window).on('resize', ajustPosition);
    // setTimeout(() => {
    //     window.location.reload();
    // }, 5000);
});