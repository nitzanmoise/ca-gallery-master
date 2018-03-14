console.log('');

var gProjs = [
    {
        id: 'minesweeper',
        name: 'Mine sweeper',
        title: 'Mines are on your way!',
        desc: 'Mark the mines, use the numbers to find thier location',
        url: 'projects/Minesweeper/index.html',
        img: 'img/portfolio/prot1.PNG',
        publishedAt: 1448693940000,
        labels: ['Matrixes', 'keyboard events']
    },
    {
        id: 'in-picture',
        name: 'In picture',
        title: 'Whats up in the picture? ',
        desc: 'Choose the options according to the picture',
        url: 'projects/in-picture/index.html',
        img: 'img/portfolio/prot2.PNG',
        publishedAt: 1448693940000,
        labels: ['Matrixes', 'keyboard events']
    }
];



function init() {
    renderPortfolio(gProjs);
    renderModal(gProjs);
}

function renderPortfolio(projs) {
    var strHtmls = '';

    projs.forEach(function (proj, idx) {
        var strHtml = `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx + 1}">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${proj.img}" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted"></p>
        </div>
      </div>`


        strHtmls += strHtml
    });

    $('.project').html(strHtmls);

}


function renderModal(projs) {
    var strModalHtmls = '';

    projs.forEach(function (proj, idx) {
        var strModalHtml =
        `<div class="portfolio-modal modal fade modal-render" id="portfolioModal${idx+1}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">${proj.title}</p>
                    <a href="${proj.url}">
                    <img class="img-fluid d-block mx-auto" src="${proj.img}" alt="">
                    </a>
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                      <li>${proj.publishedAt}</li>
                      <li>Client: Threads</li>
                      <li>Category: Illustration</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                        <i class="fa fa-times"></i>
                        Close Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`

        strModalHtmls += strModalHtml
    });
    // console.log($('.modal-conteiner'))
    $('.modal-conteiner').html(strModalHtmls);
}

function newWindow() {
  var elEmail = $('#email').val();
  var elSubject = $('#subject').val();
  var elMessageBody = $('#message-body').val();


  window.location.assign(`https://mail.google.com/mail/?view=cm&fs=1&to= ${elEmail} &su= ${elSubject} &body= ${elMessageBody}`)
}