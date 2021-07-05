export type FoursquareResponse = {
  meta: Meta
  notifications: Notification[]
  response: Response
}

export type Meta = {
  code: number
  requestId: string
  errorDetail?: string
}

export type Notification = {
  type: string
  item: NotificationItem
}

export type NotificationItem = {
  unreadCount: number
}

export type Response = {
  checkins?: Checkins
  checkin?: Checkin
  user?: User
}

export type Checkins = {
  count: number
  items: Checkin[]
}

export type CheckinDetail = {
  score: CheckinScore
  user?: User
  checkinShortUrl?: string
} & Checkin

export type Checkin = {
  id: string
  createdAt: number
  type: string
  entities?: []
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
  with?: User[]
  visibility?: 'private'
}

export type Comments = {
  count: number
  items?: Comment[]
}

export type Likes = {
  count: number
  groups: Users[]
  summary?: string
}

export type Users = {
  type: string
  count: number
  items: User[]
}

export type Icon = {
  prefix: string
  suffix: string
}

export type Photos = {
  count: number
  items: Photo[]
  layout?: Layout
}

export type Photo = {
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

export type Source = {
  name: string
  url: string
}

export type User = {
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
  birthday?: number
  canonicalUrl?: string
  checkins?: Checkins
  bio?: string
  contact?: Contact
  createdAt?: number
  friends?: Users
}

export type Contact = {
  email: string
  facebook: string
  twitter: string
  verifiedPhone: string
}

export type Layout = {
  name: string
  left?: Left
  right?: Left
}

export type Left = {
  id: string
}

export type Posts = {
  count: number
  textCount: number
}

export type Sticker = {
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

export type StickerGroup = {
  name: string
  index: number
}

export type Image = {
  prefix: string
  sizes: number[]
  name: string
}

export type PickerPosition = {
  page: number
  index: number
}

export type Venue = {
  id: string
  name: string
  location: Location
  categories: Category[]
  closed?: boolean
  locked?: boolean
  reasons?: Reasons
}

export type Category = {
  id: string
  name: string
  pluralName: string
  shortName: string
  icon: Icon
  primary: boolean
}

export type Location = {
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

export type LabeledLatLng = {
  label: string
  lat: number
  lng: number
}

export type Comment = {
  id: string
  createdAt: number
  user: User
  text: string
}

export type CheckinScore = {
  total: number
  scores: ScoreElement[]
}

export type ScoreElement = {
  icon: string
  message: string
  points: number
  target?: ScoreTarget
}

export type ScoreTarget = {
  type: string
  object: PurpleObject
}

export type PurpleObject = {
  url: string
}

export type Reasons = {
  count: number
  items: ReasonsItem[]
}

export type ReasonsItem = {
  summary: string
  type: string
  reasonName: string
  target: ItemTarget
}

export type ItemTarget = {
  type: string
  object: FluffyObject
}

export type FluffyObject = {
  id: string
  type: string
  target: ObjectTarget
  ignorable: boolean
}

export type ObjectTarget = {
  type: string
  url: string
}
