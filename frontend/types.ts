
export type ContentType = 'ebook' | 'course' | 'bundle';

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  type: ContentType;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  displayPrice?: string;
  paystackUrl?: string;
  createdAt: number;
  contentSnippet?: string;
}

export interface CartItem {
  item: LibraryItem;
  quantity: number;
}

export interface CheckoutCustomer {
  fullName: string;
  email: string;
  country: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
}

export type PaymentStatus = 'not_required' | 'pending' | 'paid' | 'failed';
export type PaymentProvider = 'none' | 'paystack';

export interface OrderPayment {
  status: PaymentStatus;
  provider: PaymentProvider;
  currency: string;
  reference?: string;
  transactionId?: string;
  paidAt?: number;
}

export interface DeliveryLink {
  itemId: string;
  title: string;
  downloadUrl: string;
  expiresAt: number;
}

export interface OrderDelivery {
  generatedAt: number;
  expiresAt: number;
  links: DeliveryLink[];
}

export interface OrderRecord {
  id: string;
  items: CartItem[];
  customer: CheckoutCustomer;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: number;
  paymentRequired: boolean;
  payment: OrderPayment;
  delivery?: OrderDelivery;
}

export type TabType = 'library' | 'about';
