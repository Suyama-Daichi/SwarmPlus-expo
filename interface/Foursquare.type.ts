export interface Checkin {
  meta: Meta
  notifications: Notification[]
  response: Response
}

export interface Meta {
  code: number
  requestId: string
  errorDetail?: string
}

export interface Notification {
  type: string
  item: NotificationItem
}

export interface NotificationItem {
  unreadCount: number
}

export interface Response {
  checkins?: Checkins
  checkin?: CheckinsItem
  user?: User
}

export interface Checkins {
  count: number
  items: CheckinsItem[]
}

export interface CheckinsItem {
  id: string
  createdAt: number
  type: string
  entities?: any[]
  shout?: string
  timeZoneOffset: number
  venue: Venue
  likes: Likes
  like: boolean
  isMayor: boolean
  photos: Photos
  posts: Posts
  comments: Comments
  source: Source
  sticker?: Sticker
  user?: User
  checkinShortUrl?: string
  score: CheckinScore
  with?: User[]
}

export interface Comments {
  count: number
  items?: CommentsItem[]
}

export interface Likes {
  count: number
  groups: GroupElement[]
  summary?: string
}

export interface GroupElement {
  type: string
  count: number
  items: User[]
}

export interface Icon {
  prefix: string
  suffix: string
}

export interface Photos {
  count: number
  items: PhotosItem[]
  layout?: Layout
}

export interface PhotosItem {
  id: string
  createdAt: number
  source: Source
  prefix: string
  suffix: string
  width: number
  height: number
  demoted: boolean
  user: User
  visibility: string
}

export interface Source {
  name: string
  url: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  gender: string
  countryCode: string
  relationship: string
  photo: Icon
  address?: string
  city?: string
  state?: string
}

export interface Layout {
  name: string
  left?: Left
  right?: Left
}

export interface Left {
  id: string
}

export interface Posts {
  count: number
  textCount: number
}

export interface Sticker {
  id: string
  name: string
  image: Image
  stickerType: string
  group: StickerGroup
  pickerPosition: PickerPosition
  teaseText: string
  unlockText: string
  bonusText?: string
  points?: number
  bonusStatus?: string
}

export interface StickerGroup {
  name: string
  index: number
}

export interface Image {
  prefix: string
  sizes: number[]
  name: string
}

export interface PickerPosition {
  page: number
  index: number
}

export interface Venue {
  id: string
  name: string
  location: Location
  categories: Category[]
  closed?: boolean
  locked?: boolean
  reasons?: Reasons
}

export interface Category {
  id: string
  name: string
  pluralName: string
  shortName: string
  icon: Icon
  primary: boolean
}

export interface Location {
  address: string
  crossStreet?: string
  lat: number
  lng: number
  labeledLatLngs?: LabeledLatLng[]
  postalCode?: string
  cc: string
  neighborhood?: string
  city: string
  state: string
  country: string
  formattedAddress: string[]
}

export interface LabeledLatLng {
  label: string
  lat: number
  lng: number
}

export interface CommentsItem {
  id: string
  createdAt: number
  user: User
  text: string
}

export interface CheckinScore {
  total: number
  scores: ScoreElement[]
}

export interface ScoreElement {
  icon: string
  message: string
  points: number
  target?: ScoreTarget
}

export interface ScoreTarget {
  type: string
  object: PurpleObject
}

export interface PurpleObject {
  url: string
}

export interface Reasons {
  count: number
  items: ReasonsItem[]
}

export interface ReasonsItem {
  summary: string
  type: string
  reasonName: string
  target: ItemTarget
}

export interface ItemTarget {
  type: string
  object: FluffyObject
}

export interface FluffyObject {
  id: string
  type: string
  target: ObjectTarget
  ignorable: boolean
}

export interface ObjectTarget {
  type: string
  url: string
}
