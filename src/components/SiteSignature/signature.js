import './signature.css';

export default function SiteSignature({
    pageVersion,
    versionOnclick,
    appendedText,
}) {
    return (
        <span className="signature">
            a dumb thing made by{' '}
            <a className="signatureLink" href="https://nealetw.com/">
                Tim Neale
            </a>
            {pageVersion ? (
                <span
                    className={versionOnclick ? 'versionLink' : ''}
                    onClick={versionOnclick}
                >
                    {' '}
                    (v. {pageVersion})
                </span>
            ) : (
                ''
            )}
            {appendedText}
        </span>
    );
}
