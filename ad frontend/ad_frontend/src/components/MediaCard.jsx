import React from 'react';

function MediaCard({ item, action }) {
  const isVideo =
    item?.mediaType === 'video' || String(item?.mediaUrl || '').match(/\.(mp4|webm|ogg)/i);

  return (
    <article className="media-card">
      <div className="media-thumb">
        {isVideo ? (
          <video controls poster={item?.poster} preload="metadata">
            <source src={item?.mediaUrl} />
          </video>
        ) : (
          <img src={item?.mediaUrl} alt={item?.title || 'Ad creative'} />
        )}
      </div>
      <div className="media-body">
        <div className="media-topline">
          <span className="chip">{item?.category || 'Campaign'}</span>
          <span className="muted">{item?.status || 'Active'}</span>
        </div>
        <h3>{item?.title || 'Untitled Ad'}</h3>
        <p>{item?.description || 'Promotional inventory ready for display.'}</p>
        <div className="media-meta">
          <span>Budget: {item?.budget || item?.price || 'N/A'}</span>
          <span>Duration: {item?.duration || '30 sec'}</span>
        </div>
        {action ? <div className="media-action">{action}</div> : null}
      </div>
    </article>
  );
}

export default MediaCard;
