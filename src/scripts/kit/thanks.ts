import { storage } from '../storage';
import { track } from '../tracking';
import { LEAD_STORAGE_KEY, type LeadSummary } from './lead';

const readLead = (): LeadSummary | null => {
	const raw = storage.read(LEAD_STORAGE_KEY);
	if (!raw) return null;
	storage.remove(LEAD_STORAGE_KEY);
	try {
		return JSON.parse(raw) as LeadSummary;
	} catch {
		return null;
	}
};

const lead = readLead();

if (lead) track({ event: 'kit_lead', ...lead });
