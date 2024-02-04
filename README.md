---
home: true
title: Examples
footer: MIT Licensed | Copyright © 2024-present ESPnet Community
search: true
tags:
  - configuration
  - theme
  - indexing
---


## ESPnet2
### ASR

| Notebooks                                                                                    | Description                                                                                                                                 |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Speech Recognition (Recipe)](/espnet2/asr/asr_cli)                                                       | This example shows you a practical ASR example using ESPnet as a command line interface, and also as a library.                             |
| [Speech Recognition (Library)](/espnet2/asr/asr_library)                                               | This example shows you a practical ASR example using ESPnet as a command line interface and library.                                        |
| [ESPnet2-ASR realtime demonstration](/espnet2/asr/espnet2_asr_realtime_demo)                   | This notebook provides a demonstration of the realtime E2E-ASR using ESPnet2-ASR.                                                           |
| [Use transfer learning for ASR in ESPnet2](/espnet2/asr/espnet2_asr_transfer_learning_demo) | In that tutorial, we will introduce several options to use pre-trained models/parameters for Automatic Speech Recognition (ASR) in ESPnet2. |
| [ESPnet2 real streaming Transformer demonstration](/espnet2/asr/espnet2_streaming_asr_demo)                 | This local notebook provides a demonstration of streaming ASR based on Transformer using ESPnet2.                                           |

### TTS

| Notebooks                                                                  | Description                                                                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [ESPnet2-TTS realtime demonstration](/espnet2/tts/espnet2_tts_realtime_demo) | This notebook provides a demonstration of the realtime E2E-TTS using ESPnet2-TTS and ParallelWaveGAN repo.      |
| [Text-to-Speech (Recipe)](/espnet2/tts/tts_cli)                                     | This is the example notebook of how-to-run the ESPnet TTS recipe using an4 dataset.                             |
| [ESPnet real time E2E-TTS demonstration](/espnet2/tts/tts_realtime_demo)                 | This notebook provides a demonstration of the realtime E2E-TTS using ESPnet-TTS and ParallelWaveGAN (+ MelGAN). |


### SE

| Notebooks                                                                                             | Description                                                                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [ESPnet Speech Enhancement Demonstration](/espnet2/se/se_demo)                                                                 | This notebook provides a demonstration of the speech enhancement and separation using ESPnet2-SE. |
| [ESPnet Speech Enhancement Demonstration](/espnet2/se/espnet_se_demonstration_for_waspaa_2021) | This notebook provides a demonstration of the speech enhancement and separation using ESPnet2-SE. |


### SLU

| Notebooks                                                            | Description                                                                                           |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [ESPNET 2 pass SLU Demonstration](/espnet2/slu/espnet2_2pass_slu_demo) | This notebook provides a demonstration of the Two Pass End-to-End Spoken Language Understanding model |


### ST

| Notebooks                             | Description                                                          |
| ------------------------------------- | -------------------------------------------------------------------- |
| [ESPNET 2 pass SLU Demonstration](/espnet2/st/st_demo) | This notebook provides a demonstration of the ST model using ESPnet. |


### Others

| Notebooks                                                           | Description                                                                                      |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [Pretrained Model](/espnet2/others/pretrained)                     | This is the example notebook of how-to-recognize and -synthesize speech using the ESPnet models. |
| [espnet_onnx demonstration](/espnet2/others/onnx_conversion_demo) | This notebook provides a demonstration of how to export your trained model into onnx format.     |



## Tutorials

| Notebooks                                                                                                                                                | Description                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CMU 11492/11692 Spring 2023: Data preparation](/tutorials/DataPreparation_CMU_11492_692_Spring2023(Assignment0))                         | In this demonstration, we will show you the procedure to prepare the data for speech processing (ASR as an example).                                                             |
| [CMU 11751/18781 Fall 2022: ESPnet Tutorial2 (New task)](/tutorials/espnet2_new_task_tutorial_CMU_11751_18781_Fall2022)                               | This tutorial shows how to add new task, new models, and create a new recipe.                                                                                                    |
| [CMU 11751/18781 Fall 2022: ESPnet Tutorial](/tutorials/espnet2_recipe_tutorial_CMU_11751_18781_Fall2022)                                   | This tutorial shows how to run existing recipes, change the training and decoding configurations and create a new recipe, and where to find resources if you encounter an issue. |
| [CMU 11751/18781 2021: ESPnet Tutorial](/tutorials/espnet2_tutorial_2021_CMU_11751_18781)                                                         | This is a collection of espnet notebook demos                                                                                                                                    |
| [CMU 11492/11692 Spring 2023: Speech Enhancement](/tutorials/SpeechEnhancement_CMU_11492_692_Spring2023(Assignment7))                     | In this demonstration, we will show you some demonstrations of speech enhancement systems in ESPnet.                                                                             |
| [CMU 11492/11692 Spring 2023: Spoken Language Understanding](/tutorials/SpokenLanguageUnderstanding_CMU_11492_692_Spring2023(Assignment6)) | In this demonstration, we will show you the procedure to conduct spoken language understanding in ESPnet.                                                                        |
| [CMU 11492/11692 Spring 2023: Text to Speech](/tutorials/TextToSpeech_CMU_11492_692_Spring2023(Assignment8))                               | In this demonstration, we will show you some demonstrations of text to speech systems in ESPnet.                                                                                 |

## ESPnetEasy

The following notebooks shows how to train/finetune the pretrained models with ESpnetEasy.

**ASR**

| Notebooks                                                     | Description                                                                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Sample demo for ESPnet-Easy!](/espnetez/asr/train)                           | This notebook shows how to train an Automatic Speech Recognition (ASR) model using the Librispeech-100 dataset.    |
| [Finetune Model with ESPnet-Easy](/espnetez/asr/finetune_with_lora) | This notebook shows the process of finetuning a pretrained model with LORA.                                        |
| [OWSM finetuning with custom dataset](/espnetez/asr/finetune_owsm)           | This notebook shows how to finetune the OWSM models usin custom dataset, `datasets` library, and `lhotse` library. |


**TTS**

| Notebooks                                   | Description                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [TTS demo for ESPnet-Easy!](/espnetez/tts/tacotron2) | This notebook shows how to train an Text to Speech (TTS) model using the LJSpeech dataset. |

