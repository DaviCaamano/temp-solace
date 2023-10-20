'use client';

import { AnimatePresence } from 'framer-motion';
import { Notebook } from '@components/notebook';
import { Editor } from '@components/editor';
import { ContentSlider, useLoginNavigation } from './';
import { EditorViewMode } from '@interface/editor';
import { SignUpPromo } from '@components/landing/promos';
import { Promo } from '#interfaces/promo';

export const Content = () => {
  const { closePromo, promos, viewMode } = useLoginNavigation();
  const signUpPromoOpen = promos.includes(Promo.signup);
  return (
    <div id={'content'} className={'w-full flex-1'}>
      <div className={contentWrapperCss(signUpPromoOpen)}>
        <AnimatePresence>
          <ContentSlider key={'editor-notebook'} open={viewMode === EditorViewMode.notebook}>
            <Notebook />
          </ContentSlider>
          <ContentSlider key={'editor-content'} open={viewMode === EditorViewMode.editor}>
            <Editor />
          </ContentSlider>
        </AnimatePresence>
      </div>
      <SignUpPromo open={signUpPromoOpen} setOpen={() => closePromo(Promo.signup)} />
    </div>
  );
};

const contentWrapperCss = (signUpPromoOpen: boolean) =>
  `content-wrapper relative w-full h-full ${signUpPromoOpen && 'opacity-25'} transition-opacity duration-300`;
