# Examples

This repository contains examples of ESPnet.

## ESPnet2
### ASR

| Notebooks                                                                                    | Description                                                                                                                                 |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [asr_cli](./espnet2/asr/asr_cli.ipynb)                                                       | This example shows you a practical ASR example using ESPnet as a command line interface, and also as a library.                             |
| [asr_library](./espnet2/asr/asr_library.ipynb)                                               | This example shows you a practical ASR example using ESPnet as a command line interface and library.                                        |
| [espnet2_asr_realtime_demo](./espnet2/asr/espnet2_asr_realtime_demo.ipynb)                   | This notebook provides a demonstration of the realtime E2E-ASR using ESPnet2-ASR.                                                           |
| [espnet2_asr_transfer_learning_demo](./espnet2/asr/espnet2_asr_transfer_learning_demo.ipynb) | In that tutorial, we will introduce several options to use pre-trained models/parameters for Automatic Speech Recognition (ASR) in ESPnet2. |
| [espnet2_streaming_asr_demo](./espnet2/asr/espnet2_streaming_asr_demo.ipynb)                 | This local notebook provides a demonstration of streaming ASR based on Transformer using ESPnet2.                                           |

### TTS

| Notebooks                                                                  | Description                                                                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [espnet2_tts_realtime_demo](./espnet2/tts/espnet2_tts_realtime_demo.ipynb) | This notebook provides a demonstration of the realtime E2E-TTS using ESPnet2-TTS and ParallelWaveGAN repo.      |
| [tts_cli](./espnet2/tts/tts_cli.ipynb)                                     | This is the example notebook of how-to-run the ESPnet TTS recipe using an4 dataset.                             |
| [tts_realtime_demo](./espnet2/tts/tts_realtime_demo.ipynb)                 | This notebook provides a demonstration of the realtime E2E-TTS using ESPnet-TTS and ParallelWaveGAN (+ MelGAN). |


### SE

| Notebooks                                                                                             | Description                                                                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [se_demo](./espnet2/se/se_demo.ipynb)                                                                 | This notebook provides a demonstration of the speech enhancement and separation using ESPnet2-SE. |
| [espnet_se_demonstration_for_waspaa_2021](./espnet2/se/espnet_se_demonstration_for_waspaa_2021.ipynb) | This notebook provides a demonstration of the speech enhancement and separation using ESPnet2-SE. |


### SLU

| Notebooks                                                            | Description                                                                                           |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [espnet2_2pass_slu_demo](./espnet2/slu/espnet2_2pass_slu_demo.ipynb) | This notebook provides a demonstration of the Two Pass End-to-End Spoken Language Understanding model |


### ST

| Notebooks                             | Description                                                          |
| ------------------------------------- | -------------------------------------------------------------------- |
| [st_demo](./espnet2/st/st_demo.ipynb) | This notebook provides a demonstration of the ST model using ESPnet. |


### Others

| Notebooks                                                           | Description                                                                                      |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [pretrained](./espnet2/others/pretrained.ipynb)                     | This is the example notebook of how-to-recognize and -synthesize speech using the ESPnet models. |
| [onnx_conversion_demo](./espnet2/others/onnx_conversion_demo.ipynb) | This notebook provides a demonstration of how to export your trained model into onnx format.     |



## Tutorials

| Notebooks                                                                                                                                                | Description                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [DataPreparation_CMU_11492_692_Spring2023(Assignment0)](./tutorials/DataPreparation_CMU_11492_692_Spring2023(Assignment0).ipynb)                         | In this demonstration, we will show you the procedure to prepare the data for speech processing (ASR as an example).                                                             |
| [espnet2_new_task_tutorial_CMU_11751_18781_Fall2022](./tutorials/espnet2_new_task_tutorial_CMU_11751_18781_Fall2022.ipynb)                               | This tutorial shows how to add new task, new models, and create a new recipe.                                                                                                    |
| [espnet2_recipe_tutorial_CMU_11751_18781_Fall2022](./tutorials/espnet2_recipe_tutorial_CMU_11751_18781_Fall2022.ipynb)                                   | This tutorial shows how to run existing recipes, change the training and decoding configurations and create a new recipe, and where to find resources if you encounter an issue. |
| [espnet2_tutorial_2021_CMU_11751_18781](./tutorials/espnet2_tutorial_2021_CMU_11751_18781.ipynb)                                                         | This is a collection of espnet notebook demos                                                                                                                                    |
| [SpeechEnhancement_CMU_11492_692_Spring2023(Assignment7)](./tutorials/SpeechEnhancement_CMU_11492_692_Spring2023(Assignment7).ipynb)                     | In this demonstration, we will show you some demonstrations of speech enhancement systems in ESPnet.                                                                             |
| [SpokenLanguageUnderstanding_CMU_11492_692_Spring2023(Assignment6)](./tutorials/SpokenLanguageUnderstanding_CMU_11492_692_Spring2023(Assignment6).ipynb) | In this demonstration, we will show you the procedure to conduct spoken language understanding in ESPnet.                                                                        |
| [TextToSpeech_CMU_11492_692_Spring2023(Assignment8)](./tutorials/TextToSpeech_CMU_11492_692_Spring2023(Assignment8).ipynb)                               | In this demonstration, we will show you some demonstrations of text to speech systems in ESPnet.                                                                                 |

## ESPnetEasy

The following notebooks shows how to train/finetune the pretrained models with ESpnetEasy.

**ASR**

| Notebooks                                                     | Description                                                                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [train](./espnetez/asr/train.ipynb)                           | This notebook shows how to train an Automatic Speech Recognition (ASR) model using the Librispeech-100 dataset.    |
| [finetune_with_lora](./espnetez/asr/finetune_with_lora.ipynb) | This notebook shows the process of finetuning a pretrained model with LORA.                                        |
| [finetune_owsm](./espnetez/asr/finetune_owsm.ipynb)           | This notebook shows how to finetune the OWSM models usin custom dataset, `datasets` library, and `lhotse` library. |


**TTS**

| Notebooks                                   | Description                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [tacotron2](./espnetez/tts/tacotron2.ipynb) | This notebook shows how to train an Text to Speech (TTS) model using the LJSpeech dataset. |

