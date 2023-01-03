import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _data;

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //1.page 1 and other page
    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupButton('next', 'right', currentPage + 1);

    //3.last page
    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupButton('prev', 'left', currentPage - 1);
    //4. other pages
    if (currentPage < numPages)
      return (
        this._generateMarkupButton('prev', 'left', currentPage - 1) +
        this._generateMarkupButton('next', 'right', currentPage + 1)
      );

    //2.page 1 and no other page
    return ``;
  }
  _generateMarkupButton(move, direction, value) {
    return `  
        <button data-goto="${value}"class="btn--inline pagination__btn--${move}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${direction}"></use>
        </svg>
        <span>Page ${value}</span>
      </button>`;
  }
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
}
export default new PaginationView();
