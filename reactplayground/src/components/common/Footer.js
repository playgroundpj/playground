import AppCss from '../../App.modules.css';

function Footer() {

    return (
        <footer className="footer">
        <div className="footer-content">
            <div className="footer-section">
                <h4>문의하는 곳</h4>
                <p>서울특별시 서대문구 연세로 50</p>
                <p>(주)카페플레이그라운드</p>
                <p>Phone: 010-1234-7890</p>
                <p>Email: contact@cafeplayground.com</p>
            </div>
            <div className="footer-section">
                <h4>영업시간</h4>
                <p>월요일 - 금요일: 10:00 AM - 10:00 PM</p>
                <p>토요일: 10:00 AM - 12:00 AM</p>
                <p>일요일 및 공휴일: 12:00 PM - 8:00 PM</p>
            </div>
            <div className="footer-section">
                <h4>SNS</h4>
                <p>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">페이스북</a>
                </p>
                <p>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">트위터</a>
                </p>
                <p>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">인스타그램</a>
                </p>
            </div>
            <div className="footer-section">
                <h4>Links</h4>
                <p>
                <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                </p>
                <p>
                <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </p>
            </div>
            </div>
            <div className="footer-bottom">
            <p>&copy; 2024 Playground. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;