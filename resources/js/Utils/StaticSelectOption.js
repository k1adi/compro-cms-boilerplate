import { HelpCircle, MessageCircle, ListCollapse, Sofa, DoorOpen, Smile } from "lucide-react";

export function FaqCategory() {
  const options = ['About the Brand', 'Room', 'Facility', 'Activity', 'Common'];
	return options.map((item) => ({ value: item, label: item }));
}

export function FaqNavItems() {
  const categories = [
    { name: 'All', icon: ListCollapse },
    { name: 'About the Brand', icon: HelpCircle },
    { name: 'Room', icon: Sofa },
    { name: 'Facility', icon: DoorOpen },
    { name: 'Activity', icon: Smile },
    { name: 'Common', icon: MessageCircle },
  ];

  return categories.map(({ name, icon }) => ({
    name,
    route: route('cms.faqs.index', { category: name.toLowerCase().replace(/\s+/g, '-') }),
    icon,
  }));
}