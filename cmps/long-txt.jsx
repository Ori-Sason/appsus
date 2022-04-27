export function LongTxt({ txt, isLong, onChangeShownText }) {
  let text = txt
  if (!isLong && txt.length > 97) text = txt.substring(0, 97).trim() + '...'

  return (
    <span className="long-txt">
      {text}{' '}
      <button className="btn btn-small" onClick={onChangeShownText}>{isLong ? 'Less' : 'More'}</button>
    </span>
  )
}
