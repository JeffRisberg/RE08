import React from 'react'

/**
 * Renders a grid of blocks from the portal page data
 *
 * @author Peter Cowan
 * @since May 2016
 */
class ResultsNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const previousPage =
            (this.props.pagination.hasPreviousPage)
                ? (
                <li><a href="#" onClick={(e) => {this.props.navigateToPage(e, this.props.pagination.previousPage)}}
                       className="resultsNavLink">&laquo;</a></li>)
                : (<li className="disabled"><a href="#">&laquo;</a></li>)

        const nextPage =
            (this.props.pagination.hasNextPage)
                ? (<li><a href="#" onClick={(e) => {this.props.navigateToPage(e, this.props.pagination.nextPage)}}
                          className="resultsNavLink">&raquo;</a></li>)
                : (<li className="disabled"><a href="#">&raquo;</a></li>)

        const self = this;
        const pages = this.props.pagination.pages.map(function (page, index) {
            return (page == self.props.pagination.currentPage)
                ? (<li><a key={index} href="#" className="active" style={{fontWeight: 'bold'}}>{page}</a></li>)
                : (<li><a key={index} href="#" className="resultsNavLink"
                          onClick={(e) => {self.props.navigateToPage(e, page)}}>{page}</a></li>)
        });

        return (<div>
            <ul className="pagination">
                {previousPage}
                {pages}
                {nextPage}
            </ul>
        </div>)

    }
}

export default ResultsNav;