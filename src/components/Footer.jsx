// Footer.jsx
export const Footer = () => {
    return(
        <div className="bg-dark text-white fixed-bottom d-flex align-items-center" id="footer">
            <marquee behavior="scroll" direction="left" scrollamount="12">
                {'\u{1F1F5}\u{1F1F8}'} FREE FREE PALESTINE {'\u{1F1F5}\u{1F1F8}'}
            </marquee>
        </div>
    );
}