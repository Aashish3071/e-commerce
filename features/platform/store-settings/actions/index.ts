'use server';

import { keystoneClient } from '@/features/dashboard/lib/keystoneClient';
import { revalidatePath } from 'next/cache';
import { optimize } from 'svgo';

function sanitizeSvg(svg: string): string {
  try {
    const result = optimize(svg, {
      plugins: [
        'preset-default',
        'removeScripts',
        {
          name: 'removeAttrs',
          params: {
            attrs: ['on*', 'onclick', 'onload', 'onerror', 'onmouseover'],
          },
        },
      ],
    });
    return result.data;
  } catch {
    return '';
  }
}

export async function getStoreSettings() {
  const query = `
    query GetStore {
      stores(take: 1) {
        id
        name
        defaultCurrencyCode
        logoIcon
        logoColor
        homepageTitle
        homepageDescription
        metadata
      }
    }
  `;

  const response = await keystoneClient(query);

  if (!response.success) {
    return { success: false, error: response.error };
  }

  return { success: true, data: response.data?.stores?.[0] || null };
}

export async function updateStoreSettings(
  storeId: string,
  data: {
    name?: string;
    logoIcon?: string;
    logoColor?: string;
    homepageTitle?: string;
    homepageDescription?: string;
    metadata?: any;
  }
) {
  // Sanitize SVG before saving to prevent XSS attacks
  const sanitizedData: any = {
    ...data,
  };

  if (data.logoIcon) {
    const sanitized = sanitizeSvg(data.logoIcon);
    if (!sanitized) {
      return { success: false, error: 'Invalid SVG format' };
    }
    sanitizedData.logoIcon = sanitized;
  }

  const mutation = `
    mutation UpdateStore($id: ID!, $data: StoreUpdateInput!) {
      updateStore(where: { id: $id }, data: $data) {
        id
        name
        logoIcon
        logoColor
        homepageTitle
        homepageDescription
        metadata
      }
    }
  `;

  const response = await keystoneClient(mutation, {
    id: storeId,
    data: sanitizedData,
  });

  if (!response.success) {
    return { success: false, error: response.error };
  }

  // Revalidate both dashboard and storefront
  try {
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/platform/store');
    revalidatePath('/', 'layout');
  } catch (e) {}

  return { success: true, data: response.data?.updateStore };
}
