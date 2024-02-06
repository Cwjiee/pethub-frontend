export default function formatTimeAgo(datetimeString) {
  const commentDate = new Date(datetimeString)
  const now = new Date()

  const timeDiff = now - commentDate;
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  let time
  if (years > 0) {
    time = years === 1 ? '1 year ago' : `${years} years ago`
  } else if (months > 0) {
    time = months === 1 ? '1 month ago' : `${months} months ago`
  } else if (days > 0) {
    time = days === 1 ? '1 day ago' : `${days} days ago`
  } else if (hours > 0) {
    time = hours === 1 ? '1 hour ago' : `${hours} hours ago`
  } else if (minutes > 0) {
    time = minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  } else {
    time = seconds === 1 ? '1 second ago' : `${seconds} seconds ago`
  }

  return time
}


