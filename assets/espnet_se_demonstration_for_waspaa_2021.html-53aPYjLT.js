import{_ as l,r as p,o as t,c as r,a as n,d as a,b as s,e as i}from"./app-FOR18dDf.js";const d={},o=n("h1",{id:"espnet-speech-enhancement-demonstration",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#espnet-speech-enhancement-demonstration"},[n("span",null,"ESPnet Speech Enhancement Demonstration")])],-1),c={href:"https://colab.research.google.com/drive/1fjRJCh96SoYLZPRxsjF9VDv4Q2VoIckI?usp=sharing",target:"_blank",rel:"noopener noreferrer"},u=n("img",{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"},null,-1),m=n("p",null,"This notebook provides a demonstration of the speech enhancement and separation using ESPnet2-SE.",-1),v=n("ul",null,[n("li",null,"ESPnet2-SE: https://github.com/espnet/espnet/tree/master/egs2/TEMPLATE/enh1")],-1),h=n("p",null,"Presenters:",-1),b=n("ul",null,[n("li",null,"Shinji Watanabe (shinjiw@cmu.edu)"),n("li",null,"Chenda Li (lichenda1996@sjtu.edu.cn)"),n("li",null,"Jing Shi (shijing2014@ia.ac.cn)"),n("li",null,"Wangyou Zhang (wyz-97@sjtu.edu.cn)"),n("li",null,"Yen-Ju Lu (neil.lu@citi.sinica.edu.tw)")],-1),_={href:"https://github.com/LiChenda",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/Emrys365",target:"_blank",rel:"noopener noreferrer"},g=i(`<h1 id="contents" tabindex="-1"><a class="header-anchor" href="#contents"><span>Contents</span></a></h1><p>(1) Tutorials on the Basic Usage</p><ol><li><p>Install</p></li><li><p>Speech Enhancement with Pretrained Models</p></li></ol><blockquote><p>We support various interfaces, e.g. Python API, HuggingFace API, portable speech enhancement scripts for other tasks, etc.</p></blockquote><p>2.1 Single-channel Enhancement (CHiME-4)</p><p>2.2 Enhance Your Own Recordings</p><p>2.3 Multi-channel Enhancement (CHiME-4)</p><ol start="3"><li>Speech Separation with Pretrained Models</li></ol><p>3.1 Model Selection</p><p>3.2 Separate Speech Mixture</p><ol start="4"><li>Evaluate Separated Speech with the Pretrained ASR Model</li></ol><p>(2) Tutorials for Adding New Recipe and Contributing to ESPnet-SE Project</p><ol><li><p>Creating a New Recipe</p></li><li><p>Implementing a New Speech Enhancement/Separation Model</p></li></ol><h1 id="_1-tutorials-on-the-basic-usage" tabindex="-1"><a class="header-anchor" href="#_1-tutorials-on-the-basic-usage"><span>(1) Tutorials on the Basic Usage</span></a></h1><h2 id="install" tabindex="-1"><a class="header-anchor" href="#install"><span>Install</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>%pip install -q espnet==0.10.1</span></span>
<span class="line"><span>%pip install -q espnet_model_zoo</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="speech-enhancement-with-pretrained-models" tabindex="-1"><a class="header-anchor" href="#speech-enhancement-with-pretrained-models"><span>Speech Enhancement with Pretrained Models</span></a></h2><h3 id="single-channel-enhancement-the-chime-example" tabindex="-1"><a class="header-anchor" href="#single-channel-enhancement-the-chime-example"><span>Single-Channel Enhancement, the CHiME example</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span># Download one utterance from real noisy speech of CHiME4</span></span>
<span class="line"><span>!gdown --id 1SmrN5NFSg6JuQSs2sfy3ehD8OIcqK6wS -O /content/M05_440C0213_PED_REAL.wav</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import soundfile</span></span>
<span class="line"><span>from IPython.display import display, Audio</span></span>
<span class="line"><span>mixwav_mc, sr = soundfile.read(&quot;/content/M05_440C0213_PED_REAL.wav&quot;)</span></span>
<span class="line"><span># mixwav.shape: num_samples, num_channels</span></span>
<span class="line"><span>mixwav_sc = mixwav_mc[:,4]</span></span>
<span class="line"><span>display(Audio(mixwav_mc.T, rate=sr))</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="download-and-load-the-pretrained-conv-tasnet" tabindex="-1"><a class="header-anchor" href="#download-and-load-the-pretrained-conv-tasnet"><span>Download and load the pretrained Conv-Tasnet</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!gdown --id 17DMWdw84wF3fz3t7ia1zssdzhkpVQGZm -O /content/chime_tasnet_singlechannel.zip</span></span>
<span class="line"><span>!unzip /content/chime_tasnet_singlechannel.zip -d /content/enh_model_sc</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span># Load the model</span></span>
<span class="line"><span># If you encounter error &quot;No module named &#39;espnet2&#39;&quot;, please re-run the 1st Cell. This might be a colab bug.</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span>import soundfile</span></span>
<span class="line"><span>from espnet2.bin.enh_inference import SeparateSpeech</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>separate_speech = {}</span></span>
<span class="line"><span># For models downloaded from GoogleDrive, you can use the following script:</span></span>
<span class="line"><span>enh_model_sc = SeparateSpeech(</span></span>
<span class="line"><span>  train_config=&quot;/content/enh_model_sc/exp/enh_train_enh_conv_tasnet_raw/config.yaml&quot;,</span></span>
<span class="line"><span>  model_file=&quot;/content/enh_model_sc/exp/enh_train_enh_conv_tasnet_raw/5epoch.pth&quot;,</span></span>
<span class="line"><span>  # for segment-wise process on long speech</span></span>
<span class="line"><span>  normalize_segment_scale=False,</span></span>
<span class="line"><span>  show_progressbar=True,</span></span>
<span class="line"><span>  ref_channel=4,</span></span>
<span class="line"><span>  normalize_output_wav=True,</span></span>
<span class="line"><span>  device=&quot;cuda:0&quot;,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="enhance-the-single-channel-real-noisy-speech-in-chime4" tabindex="-1"><a class="header-anchor" href="#enhance-the-single-channel-real-noisy-speech-in-chime4"><span>Enhance the single-channel real noisy speech in CHiME4</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span># play the enhanced single-channel speech</span></span>
<span class="line"><span>wave = enh_model_sc(mixwav_sc[None, ...], sr)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&quot;Input real noisy speech&quot;, flush=True)</span></span>
<span class="line"><span>display(Audio(mixwav_sc, rate=sr))</span></span>
<span class="line"><span>print(&quot;Enhanced speech&quot;, flush=True)</span></span>
<span class="line"><span>display(Audio(wave[0].squeeze(), rate=sr))</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="enhance-your-own-pre-recordings" tabindex="-1"><a class="header-anchor" href="#enhance-your-own-pre-recordings"><span>Enhance your own pre-recordings</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>from google.colab import files</span></span>
<span class="line"><span>from IPython.display import display, Audio</span></span>
<span class="line"><span>import soundfile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>uploaded = files.upload()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for file_name in uploaded.keys():</span></span>
<span class="line"><span>  speech, rate = soundfile.read(file_name)</span></span>
<span class="line"><span>  assert rate == sr, &quot;mismatch in sampling rate&quot;</span></span>
<span class="line"><span>  wave = enh_model_sc(speech[None, ...], sr)</span></span>
<span class="line"><span>  print(f&quot;Your input speech {file_name}&quot;, flush=True)</span></span>
<span class="line"><span>  display(Audio(speech, rate=sr))</span></span>
<span class="line"><span>  print(f&quot;Enhanced speech for {file_name}&quot;, flush=True)</span></span>
<span class="line"><span>  display(Audio(wave[0].squeeze(), rate=sr))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="multi-channel-enhancement" tabindex="-1"><a class="header-anchor" href="#multi-channel-enhancement"><span>Multi-Channel Enhancement</span></a></h3><h4 id="download-and-load-the-pretrained-mvdr-neural-beamformer" tabindex="-1"><a class="header-anchor" href="#download-and-load-the-pretrained-mvdr-neural-beamformer"><span>Download and load the pretrained mvdr neural beamformer.</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span># Download the pretained enhancement model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>!gdown --id 1FohDfBlOa7ipc9v2luY-QIFQ_GJ1iW_i -O /content/mvdr_beamformer_16k_se_raw_valid.zip</span></span>
<span class="line"><span>!unzip /content/mvdr_beamformer_16k_se_raw_valid.zip -d /content/enh_model_mc </span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span># Load the model</span></span>
<span class="line"><span># If you encounter error &quot;No module named &#39;espnet2&#39;&quot;, please re-run the 1st Cell. This might be a colab bug.</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span>import soundfile</span></span>
<span class="line"><span>from espnet2.bin.enh_inference import SeparateSpeech</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>separate_speech = {}</span></span>
<span class="line"><span># For models downloaded from GoogleDrive, you can use the following script:</span></span>
<span class="line"><span>enh_model_mc = SeparateSpeech(</span></span>
<span class="line"><span>  train_config=&quot;/content/enh_model_mc/exp/enh_train_enh_beamformer_mvdr_raw/config.yaml&quot;,</span></span>
<span class="line"><span>  model_file=&quot;/content/enh_model_mc/exp/enh_train_enh_beamformer_mvdr_raw/11epoch.pth&quot;,</span></span>
<span class="line"><span>  # for segment-wise process on long speech</span></span>
<span class="line"><span>  normalize_segment_scale=False,</span></span>
<span class="line"><span>  show_progressbar=True,</span></span>
<span class="line"><span>  ref_channel=4,</span></span>
<span class="line"><span>  normalize_output_wav=True,</span></span>
<span class="line"><span>  device=&quot;cuda:0&quot;,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="enhance-the-multi-channel-real-noisy-speech-in-chime4" tabindex="-1"><a class="header-anchor" href="#enhance-the-multi-channel-real-noisy-speech-in-chime4"><span>Enhance the multi-channel real noisy speech in CHiME4</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>wave = enh_model_mc(mixwav_mc[None, ...], sr)</span></span>
<span class="line"><span>print(&quot;Input real noisy speech&quot;, flush=True)</span></span>
<span class="line"><span>display(Audio(mixwav_mc.T, rate=sr))</span></span>
<span class="line"><span>print(&quot;Enhanced speech&quot;, flush=True)</span></span>
<span class="line"><span>display(Audio(wave[0].squeeze(), rate=sr))</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="portable-speech-enhancement-scripts-for-other-tasks" tabindex="-1"><a class="header-anchor" href="#portable-speech-enhancement-scripts-for-other-tasks"><span>Portable speech enhancement scripts for other tasks</span></a></h4><p>For an ESPNet ASR or TTS dataset like below:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>data</span></span>
<span class="line"><span>\`-- et05_real_isolated_6ch_track</span></span>
<span class="line"><span>    |-- spk2utt</span></span>
<span class="line"><span>    |-- text</span></span>
<span class="line"><span>    |-- utt2spk</span></span>
<span class="line"><span>    |-- utt2uniq</span></span>
<span class="line"><span>    \`-- wav.scp</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run the following scripts to create an enhanced dataset:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>scripts/utils/enhance_dataset.sh \\</span></span>
<span class="line"><span>    --spk_num 1 \\</span></span>
<span class="line"><span>    --gpu_inference true \\</span></span>
<span class="line"><span>    --inference_nj 4 \\</span></span>
<span class="line"><span>    --fs 16k \\</span></span>
<span class="line"><span>    --id_prefix &quot;&quot; \\</span></span>
<span class="line"><span>    dump/raw/et05_real_isolated_6ch_track \\</span></span>
<span class="line"><span>    data/et05_real_isolated_6ch_track_enh \\</span></span>
<span class="line"><span>    exp/enh_train_enh_beamformer_mvdr_raw/valid.loss.best.pth</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above script will generate a new directory data/et05_real_isolated_6ch_track_enh:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>data</span></span>
<span class="line"><span>\`-- et05_real_isolated_6ch_track_enh</span></span>
<span class="line"><span>    |-- spk2utt</span></span>
<span class="line"><span>    |-- text</span></span>
<span class="line"><span>    |-- utt2spk</span></span>
<span class="line"><span>    |-- utt2uniq</span></span>
<span class="line"><span>    |-- wav.scp</span></span>
<span class="line"><span>    \`-- wavs/</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>where wav.scp contains paths to the enhanced audios (stored in wavs/).</p><h2 id="speech-separation" tabindex="-1"><a class="header-anchor" href="#speech-separation"><span>Speech Separation</span></a></h2><h3 id="model-selection" tabindex="-1"><a class="header-anchor" href="#model-selection"><span>Model Selection</span></a></h3><p>In this demonstration, we will show different speech separation models on wsj0_2mix.</p>`,43),x={href:"https://zenodo.org/",target:"_blank",rel:"noopener noreferrer"},q={href:"https://huggingface.co/",target:"_blank",rel:"noopener noreferrer"},w=i(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>#@title Choose Speech Separation model { run: &quot;auto&quot; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fs = 8000 #@param {type:&quot;integer&quot;}</span></span>
<span class="line"><span>tag = &quot;espnet/Chenda_Li_wsj0_2mix_enh_train_enh_conv_tasnet_raw_valid.si_snr.ave&quot; #@param [&quot;Chenda Li/wsj0_2mix_enh_train_enh_conv_tasnet_raw_valid.si_snr.ave&quot;, &quot;Chenda Li/wsj0_2mix_enh_train_enh_rnn_tf_raw_valid.si_snr.ave&quot;, &quot;https://zenodo.org/record/4688000/files/enh_train_enh_dprnn_tasnet_raw_valid.si_snr.ave.zip&quot;, &quot;espnet/Chenda_Li_wsj0_2mix_enh_train_enh_conv_tasnet_raw_valid.si_snr.ave&quot;]</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span># For models uploaded to Zenodo, you can use the following python script instead:</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span>import soundfile</span></span>
<span class="line"><span>from espnet_model_zoo.downloader import ModelDownloader</span></span>
<span class="line"><span>from espnet2.bin.enh_inference import SeparateSpeech</span></span>
<span class="line"><span></span></span>
<span class="line"><span>d = ModelDownloader()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cfg = d.download_and_unpack(tag)</span></span>
<span class="line"><span>separate_speech = SeparateSpeech(</span></span>
<span class="line"><span>  enh_train_config=cfg[&quot;train_config&quot;],</span></span>
<span class="line"><span>  enh_model_file=cfg[&quot;model_file&quot;],</span></span>
<span class="line"><span>  # for segment-wise process on long speech</span></span>
<span class="line"><span>  segment_size=2.4,</span></span>
<span class="line"><span>  hop_size=0.8,</span></span>
<span class="line"><span>  normalize_segment_scale=False,</span></span>
<span class="line"><span>  show_progressbar=True,</span></span>
<span class="line"><span>  ref_channel=None,</span></span>
<span class="line"><span>  normalize_output_wav=True,</span></span>
<span class="line"><span>  device=&quot;cuda:0&quot;,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="separate-speech-mixture" tabindex="-1"><a class="header-anchor" href="#separate-speech-mixture"><span>Separate Speech Mixture</span></a></h3><h4 id="separate-the-example-in-wsj0-2mix-testing-set" tabindex="-1"><a class="header-anchor" href="#separate-the-example-in-wsj0-2mix-testing-set"><span>Separate the example in wsj0_2mix testing set</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!gdown --id 1ZCUkd_Lb7pO2rpPr4FqYdtJBZ7JMiInx -O /content/447c020t_1.2106_422a0112_-1.2106.wav</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import soundfile</span></span>
<span class="line"><span>from IPython.display import display, Audio</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mixwav, sr = soundfile.read(&quot;447c020t_1.2106_422a0112_-1.2106.wav&quot;)</span></span>
<span class="line"><span>waves_wsj = separate_speech(mixwav[None, ...], fs=sr)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&quot;Input mixture&quot;, flush=True)</span></span>
<span class="line"><span>display(Audio(mixwav, rate=sr))</span></span>
<span class="line"><span>print(f&quot;========= Separated speech with model {tag} =========&quot;, flush=True)</span></span>
<span class="line"><span>print(&quot;Separated spk1&quot;, flush=True)</span></span>
<span class="line"><span>display(Audio(waves_wsj[0].squeeze(), rate=sr))</span></span>
<span class="line"><span>print(&quot;Separated spk2&quot;, flush=True)</span></span>
<span class="line"><span>display(Audio(waves_wsj[1].squeeze(), rate=sr))</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="separate-your-own-recordings" tabindex="-1"><a class="header-anchor" href="#separate-your-own-recordings"><span>Separate your own recordings</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>from google.colab import files</span></span>
<span class="line"><span>from IPython.display import display, Audio</span></span>
<span class="line"><span>import soundfile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>uploaded = files.upload()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for file_name in uploaded.keys():</span></span>
<span class="line"><span>  mixwav_yours, rate = soundfile.read(file_name)</span></span>
<span class="line"><span>  assert rate == sr, &quot;mismatch in sampling rate&quot;</span></span>
<span class="line"><span>  waves_yours = separate_speech(mixwav_yours[None, ...], fs=sr)</span></span>
<span class="line"><span>  print(&quot;Input mixture&quot;, flush=True)</span></span>
<span class="line"><span>  display(Audio(mixwav_yours, rate=sr))</span></span>
<span class="line"><span>  print(f&quot;========= Separated speech with model {tag} =========&quot;, flush=True)</span></span>
<span class="line"><span>  print(&quot;Separated spk1&quot;, flush=True)</span></span>
<span class="line"><span>  display(Audio(waves_yours[0].squeeze(), rate=sr))</span></span>
<span class="line"><span>  print(&quot;Separated spk2&quot;, flush=True)</span></span>
<span class="line"><span>  display(Audio(waves_yours[1].squeeze(), rate=sr))</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="show-spectrums-of-separated-speech" tabindex="-1"><a class="header-anchor" href="#show-spectrums-of-separated-speech"><span>Show spectrums of separated speech</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import matplotlib.pyplot as plt</span></span>
<span class="line"><span>import torch</span></span>
<span class="line"><span>from torch_complex.tensor import ComplexTensor</span></span>
<span class="line"><span></span></span>
<span class="line"><span>from espnet.asr.asr_utils import plot_spectrogram</span></span>
<span class="line"><span>from espnet2.layers.stft import Stft</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>stft = Stft(</span></span>
<span class="line"><span>  n_fft=512,</span></span>
<span class="line"><span>  win_length=None,</span></span>
<span class="line"><span>  hop_length=128,</span></span>
<span class="line"><span>  window=&quot;hann&quot;,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>ilens = torch.LongTensor([len(mixwav)])</span></span>
<span class="line"><span># specs: (T, F)</span></span>
<span class="line"><span>spec_mix = ComplexTensor(</span></span>
<span class="line"><span>    *torch.unbind(</span></span>
<span class="line"><span>      stft(torch.as_tensor(mixwav).unsqueeze(0), ilens)[0].squeeze(),</span></span>
<span class="line"><span>      dim=-1</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>spec_sep1 = ComplexTensor(</span></span>
<span class="line"><span>    *torch.unbind(</span></span>
<span class="line"><span>      stft(torch.as_tensor(waves_wsj[0]), ilens)[0].squeeze(),</span></span>
<span class="line"><span>      dim=-1</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>spec_sep2 = ComplexTensor(</span></span>
<span class="line"><span>    *torch.unbind(</span></span>
<span class="line"><span>      stft(torch.as_tensor(waves_wsj[1]), ilens)[0].squeeze(),</span></span>
<span class="line"><span>      dim=-1</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># freqs = torch.linspace(0, sr / 2, spec_mix.shape[1])</span></span>
<span class="line"><span># frames = torch.linspace(0, len(mixwav) / sr, spec_mix.shape[0])</span></span>
<span class="line"><span>samples = torch.linspace(0, len(mixwav) / sr, len(mixwav))</span></span>
<span class="line"><span>plt.figure(figsize=(24, 12))</span></span>
<span class="line"><span>plt.subplot(3, 2, 1)</span></span>
<span class="line"><span>plt.title(&#39;Mixture Spectrogram&#39;)</span></span>
<span class="line"><span>plot_spectrogram(</span></span>
<span class="line"><span>  plt, abs(spec_mix).transpose(-1, -2).numpy(), fs=sr,</span></span>
<span class="line"><span>  mode=&#39;db&#39;, frame_shift=None,</span></span>
<span class="line"><span>  bottom=False, labelbottom=False</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>plt.subplot(3, 2, 2)</span></span>
<span class="line"><span>plt.title(&#39;Mixture Wavform&#39;)</span></span>
<span class="line"><span>plt.plot(samples, mixwav)</span></span>
<span class="line"><span>plt.xlim(0, len(mixwav) / sr)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>plt.subplot(3, 2, 3)</span></span>
<span class="line"><span>plt.title(&#39;Separated Spectrogram (spk1)&#39;)</span></span>
<span class="line"><span>plot_spectrogram(</span></span>
<span class="line"><span>  plt, abs(spec_sep1).transpose(-1, -2).numpy(), fs=sr,</span></span>
<span class="line"><span>  mode=&#39;db&#39;, frame_shift=None,</span></span>
<span class="line"><span>  bottom=False, labelbottom=False</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>plt.subplot(3, 2, 4)</span></span>
<span class="line"><span>plt.title(&#39;Separated Wavform (spk1)&#39;)</span></span>
<span class="line"><span>plt.plot(samples, waves_wsj[0].squeeze())</span></span>
<span class="line"><span>plt.xlim(0, len(mixwav) / sr)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>plt.subplot(3, 2, 5)</span></span>
<span class="line"><span>plt.title(&#39;Separated Spectrogram (spk2)&#39;)</span></span>
<span class="line"><span>plot_spectrogram(</span></span>
<span class="line"><span>  plt, abs(spec_sep2).transpose(-1, -2).numpy(), fs=sr,</span></span>
<span class="line"><span>  mode=&#39;db&#39;, frame_shift=None,</span></span>
<span class="line"><span>  bottom=False, labelbottom=False</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>plt.subplot(3, 2, 6)</span></span>
<span class="line"><span>plt.title(&#39;Separated Wavform (spk2)&#39;)</span></span>
<span class="line"><span>plt.plot(samples, waves_wsj[1].squeeze())</span></span>
<span class="line"><span>plt.xlim(0, len(mixwav) / sr)</span></span>
<span class="line"><span>plt.xlabel(&quot;Time (s)&quot;)</span></span>
<span class="line"><span>plt.show()</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="evluate-separated-speech-with-pretrained-asr-model" tabindex="-1"><a class="header-anchor" href="#evluate-separated-speech-with-pretrained-asr-model"><span>Evluate separated speech with pretrained ASR model</span></a></h2><p>The ground truths are:</p><p><code>text_1: SOME CRITICS INCLUDING HIGH REAGAN ADMINISTRATION OFFICIALS ARE RAISING THE ALARM THAT THE FED&#39;S POLICY IS TOO TIGHT AND COULD CAUSE A RECESSION NEXT YEAR</code></p><p><code>text_2: THE UNITED STATES UNDERTOOK TO DEFEND WESTERN EUROPE AGAINST SOVIET ATTACK</code></p><p>(This may take a while for the speech recognition.)</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>%pip install -q https://github.com/kpu/kenlm/archive/master.zip # ASR need kenlm</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import espnet_model_zoo</span></span>
<span class="line"><span>from espnet_model_zoo.downloader import ModelDownloader</span></span>
<span class="line"><span>from espnet2.bin.asr_inference import Speech2Text</span></span>
<span class="line"><span></span></span>
<span class="line"><span>wsj_8k_model_url=&quot;https://zenodo.org/record/4012264/files/asr_train_asr_transformer_raw_char_1gpu_valid.acc.ave.zip?download=1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>d = ModelDownloader()</span></span>
<span class="line"><span>speech2text = Speech2Text(</span></span>
<span class="line"><span>  **d.download_and_unpack(wsj_8k_model_url),</span></span>
<span class="line"><span>  device=&quot;cuda:0&quot;,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>text_est = [None, None]</span></span>
<span class="line"><span>text_est[0], *_ = speech2text(waves_wsj[0].squeeze())[0]</span></span>
<span class="line"><span>text_est[1], *_ = speech2text(waves_wsj[1].squeeze())[0]</span></span>
<span class="line"><span>text_m, *_ = speech2text(mixwav)[0]</span></span>
<span class="line"><span>print(&quot;Mix Speech to Text: &quot;, text_m)</span></span>
<span class="line"><span>print(&quot;Separated Speech 1 to Text: &quot;, text_est[0])</span></span>
<span class="line"><span>print(&quot;Separated Speech 2 to Text: &quot;, text_est[1])</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import difflib</span></span>
<span class="line"><span>from itertools import permutations</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import editdistance</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span></span></span>
<span class="line"><span>colors = dict(</span></span>
<span class="line"><span>    red=lambda text: f&quot;\\033[38;2;255;0;0m{text}\\033[0m&quot; if text else &quot;&quot;,</span></span>
<span class="line"><span>    green=lambda text: f&quot;\\033[38;2;0;255;0m{text}\\033[0m&quot; if text else &quot;&quot;,</span></span>
<span class="line"><span>    yellow=lambda text: f&quot;\\033[38;2;225;225;0m{text}\\033[0m&quot; if text else &quot;&quot;,</span></span>
<span class="line"><span>    white=lambda text: f&quot;\\033[38;2;255;255;255m{text}\\033[0m&quot; if text else &quot;&quot;,</span></span>
<span class="line"><span>    black=lambda text: f&quot;\\033[38;2;0;0;0m{text}\\033[0m&quot; if text else &quot;&quot;,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def diff_strings(ref, est):</span></span>
<span class="line"><span>    &quot;&quot;&quot;Reference: https://stackoverflow.com/a/64404008/7384873&quot;&quot;&quot;</span></span>
<span class="line"><span>    ref_str, est_str, err_str = [], [], []</span></span>
<span class="line"><span>    matcher = difflib.SequenceMatcher(None, ref, est)</span></span>
<span class="line"><span>    for opcode, a0, a1, b0, b1 in matcher.get_opcodes():</span></span>
<span class="line"><span>        if opcode == &quot;equal&quot;:</span></span>
<span class="line"><span>            txt = ref[a0:a1]</span></span>
<span class="line"><span>            ref_str.append(txt)</span></span>
<span class="line"><span>            est_str.append(txt)</span></span>
<span class="line"><span>            err_str.append(&quot; &quot; * (a1 - a0))</span></span>
<span class="line"><span>        elif opcode == &quot;insert&quot;:</span></span>
<span class="line"><span>            ref_str.append(&quot;*&quot; * (b1 - b0))</span></span>
<span class="line"><span>            est_str.append(colors[&quot;green&quot;](est[b0:b1]))</span></span>
<span class="line"><span>            err_str.append(colors[&quot;black&quot;](&quot;I&quot; * (b1 - b0)))</span></span>
<span class="line"><span>        elif opcode == &quot;delete&quot;:</span></span>
<span class="line"><span>            ref_str.append(ref[a0:a1])</span></span>
<span class="line"><span>            est_str.append(colors[&quot;red&quot;](&quot;*&quot; * (a1 - a0)))</span></span>
<span class="line"><span>            err_str.append(colors[&quot;black&quot;](&quot;D&quot; * (a1 - a0)))</span></span>
<span class="line"><span>        elif opcode == &quot;replace&quot;:</span></span>
<span class="line"><span>            diff = a1 - a0 - b1 + b0</span></span>
<span class="line"><span>            if diff &gt;= 0:</span></span>
<span class="line"><span>                txt_ref = ref[a0:a1]</span></span>
<span class="line"><span>                txt_est = colors[&quot;yellow&quot;](est[b0:b1]) + colors[&quot;red&quot;](&quot;*&quot; * diff)</span></span>
<span class="line"><span>                txt_err = &quot;S&quot; * (b1 - b0) + &quot;D&quot; * diff</span></span>
<span class="line"><span>            elif diff &lt; 0:</span></span>
<span class="line"><span>                txt_ref = ref[a0:a1] + &quot;*&quot; * -diff</span></span>
<span class="line"><span>                txt_est = colors[&quot;yellow&quot;](est[b0:b1]) + colors[&quot;green&quot;](&quot;*&quot; * -diff)</span></span>
<span class="line"><span>                txt_err = &quot;S&quot; * (b1 - b0) + &quot;I&quot; * -diff</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            ref_str.append(txt_ref)</span></span>
<span class="line"><span>            est_str.append(txt_est)</span></span>
<span class="line"><span>            err_str.append(colors[&quot;black&quot;](txt_err))</span></span>
<span class="line"><span>    return &quot;&quot;.join(ref_str), &quot;&quot;.join(est_str), &quot;&quot;.join(err_str)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>text_ref = [</span></span>
<span class="line"><span>  &quot;SOME CRITICS INCLUDING HIGH REAGAN ADMINISTRATION OFFICIALS ARE RAISING THE ALARM THAT THE FED&#39;S POLICY IS TOO TIGHT AND COULD CAUSE A RECESSION NEXT YEAR&quot;,</span></span>
<span class="line"><span>  &quot;THE UNITED STATES UNDERTOOK TO DEFEND WESTERN EUROPE AGAINST SOVIET ATTACK&quot;,</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&quot;=====================&quot; , flush=True)</span></span>
<span class="line"><span>perms = list(permutations(range(2)))</span></span>
<span class="line"><span>string_edit = [</span></span>
<span class="line"><span>  [</span></span>
<span class="line"><span>    editdistance.eval(text_ref[m], text_est[n])</span></span>
<span class="line"><span>    for m, n in enumerate(p)</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  for p in perms</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dist = [sum(edist) for edist in string_edit]</span></span>
<span class="line"><span>perm_idx = np.argmin(dist)</span></span>
<span class="line"><span>perm = perms[perm_idx]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for i, p in enumerate(perm):</span></span>
<span class="line"><span>  print(&quot;\\n--------------- Text %d ---------------&quot; % (i + 1), flush=True)</span></span>
<span class="line"><span>  ref, est, err = diff_strings(text_ref[i], text_est[p])</span></span>
<span class="line"><span>  print(&quot;REF: &quot; + ref + &quot;\\n&quot; + &quot;HYP: &quot; + est + &quot;\\n&quot; + &quot;ERR: &quot; + err, flush=True)</span></span>
<span class="line"><span>  print(&quot;Edit Distance = {}\\n&quot;.format(string_edit[perm_idx][i]), flush=True)</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2-tutorials-on-contributing-to-espnet-se-project" tabindex="-1"><a class="header-anchor" href="#_2-tutorials-on-contributing-to-espnet-se-project"><span>(2) Tutorials on Contributing to ESPNet-SE Project</span></a></h1><p>If you would like to contribute to the ESPnet-SE project, or if you would like to make modifications based on the current speech enhancement/separation functionality, the following tutorials will provide you detailed information about how to creating new recipes or new models in ESPnet-SE.</p><h2 id="creating-a-new-recipe" tabindex="-1"><a class="header-anchor" href="#creating-a-new-recipe"><span>Creating a New Recipe</span></a></h2><h3 id="step-1-create-recipe-directory" tabindex="-1"><a class="header-anchor" href="#step-1-create-recipe-directory"><span>Step 1 Create recipe directory</span></a></h3><p>First, run the following command to create the directory for the new recipe from our template:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span style="color:#DCDCAA;">egs2/TEMPLATE/enh1/setup.sh</span><span style="color:#CE9178;"> egs2/</span><span style="color:#D4D4D4;">&lt;</span><span style="color:#CE9178;">your-recipe-nam</span><span style="color:#D4D4D4;">e&gt;</span><span style="color:#CE9178;">/enh1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>For the following steps, we assume the operations are done under the directory <code>egs2/&lt;your-recipe-name&gt;/enh1/</code>.</p></blockquote><h3 id="step-2-write-scripts-for-data-preparation" tabindex="-1"><a class="header-anchor" href="#step-2-write-scripts-for-data-preparation"><span>Step 2 Write scripts for data preparation</span></a></h3>`,25),y=n("code",null,"local/data.sh",-1),E=n("code",null,"enh.sh",-1),k={href:"https://github.com/espnet/espnet/blob/master/egs2/wsj0_2mix/enh1/local/data.sh",target:"_blank",rel:"noopener noreferrer"},D=i(`<p>The script <code>local/data.sh</code> should finally generate Kaldi-style data directories under <code>&lt;recipe-dir&gt;/data/</code>. Each subset directory should contains at least 4 files:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>&lt;recipe-dir&gt;/data/&lt;subset-name&gt;/</span></span>
<span class="line"><span>├── spk{1,2,3...}.scp   (clean speech references)</span></span>
<span class="line"><span>├── spk2utt</span></span>
<span class="line"><span>├── utt2spk</span></span>
<span class="line"><span>└── wav.scp    (noisy speech)</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Optionally, it can also contain <code>noise{}.scp</code> and <code>dereverb{}.scp</code>, which point to the corresponding noise and dereverberated references respectively. {} can be 1, 2, ..., depending on the number of noise types (dereverberated signals) in the input signal in <code>wav.scp</code>.</p><p>Make sure to sort the scp and other related files as in Kaldi. Also, remember to run <code>. ./path.sh</code> in <code>local/data.sh</code> before sorting, because it will force sorting to be byte-wise, i.e. <code>export LC_ALL=C</code>.</p>`,4),S={href:"https://www.shellcheck.net/",target:"_blank",rel:"noopener noreferrer"},T={href:"https://github.com/espnet/espnet/blob/master/ci/test_shell.sh",target:"_blank",rel:"noopener noreferrer"},C=n("h3",{id:"step-3-prepare-training-configuration",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#step-3-prepare-training-configuration"},[n("span",null,"Step 3 Prepare training configuration")])],-1),A={href:"https://github.com/espnet/espnet/blob/master/egs2/wsj0_2mix/enh1/conf/tuning/train_enh_rnn_tf.yaml",target:"_blank",rel:"noopener noreferrer"},I=n("code",null,"conf/",-1),N=n("blockquote",null,[n("p",null,[s("If you have multiple configuration files, it is recommended to put them under "),n("code",null,"conf/tuning/"),s(", and create a symbolic link "),n("code",null,"conf/tuning/train.yaml"),s(" pointing to the config file with the best performance.")])],-1),z=n("h3",{id:"step-4-prepare-run-sh",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#step-4-prepare-run-sh"},[n("span",null,"Step 4 Prepare run.sh")])],-1),F=n("code",null,"run.sh",-1),R=n("code",null,"./run.sh",-1),L={href:"https://github.com/espnet/espnet/blob/master/egs2/wsj0_2mix/enh1/run.sh",target:"_blank",rel:"noopener noreferrer"},j=n("blockquote",null,[n("p",null,[s("If your recipes provide references for noise and/or dereverberation, you can add the argument "),n("code",null,"--use_noise_ref true"),s(" and/or "),n("code",null,"--use_dereverb_ref true"),s(" in "),n("code",null,"run.sh"),s(".")])],-1),P=n("h2",{id:"implementing-a-new-speech-enhancement-separation-model",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#implementing-a-new-speech-enhancement-separation-model"},[n("span",null,"Implementing a New Speech Enhancement/Separation Model")])],-1),M=n("p",null,"The current ESPnet-SE tool adopts an encoder-separator-decoder architecture for all models, e.g.",-1),O={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/encoder/stft_encoder.py",target:"_blank",rel:"noopener noreferrer"},H={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/decoder/stft_decoder.py",target:"_blank",rel:"noopener noreferrer"},G={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/separator/dprnn_separator.py",target:"_blank",rel:"noopener noreferrer"},U={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/separator/rnn_separator.py",target:"_blank",rel:"noopener noreferrer"},W={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/separator/tcn_separator.py",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/separator/transformer_separator.py",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/encoder/conv_encoder.py",target:"_blank",rel:"noopener noreferrer"},V={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/decoder/conv_decoder.py",target:"_blank",rel:"noopener noreferrer"},J={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/separator/tcn_separator.py",target:"_blank",rel:"noopener noreferrer"},K=n("h3",{id:"step-1-create-model-scripts",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#step-1-create-model-scripts"},[n("span",null,"Step 1 Create model scripts")])],-1),Z={href:"https://github.com/espnet/espnet/tree/master/espnet2/enh/encoder",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://github.com/espnet/espnet/tree/master/espnet2/enh/separator",target:"_blank",rel:"noopener noreferrer"},X={href:"https://github.com/espnet/espnet/tree/master/espnet2/enh/decoder",target:"_blank",rel:"noopener noreferrer"},$=n("code",null,"num_spk",-1),nn={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/separator/rnn_separator.py",target:"_blank",rel:"noopener noreferrer"},sn=n("code",null,"black",-1),en=n("code",null,"flake8",-1),an={href:"https://github.com/espnet/espnet/blob/master/ci/test_python.sh",target:"_blank",rel:"noopener noreferrer"},ln=n("h3",{id:"step-2-add-the-new-model-to-related-scripts",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#step-2-add-the-new-model-to-related-scripts"},[n("span",null,"Step 2 Add the new model to related scripts")])],-1),pn={href:"https://github.com/espnet/espnet/blob/master/espnet2/tasks/enh.py#L37-L62",target:"_blank",rel:"noopener noreferrer"},tn=n("code",null,"ClassChoices",-1),rn=i('<ul><li>For encoders, add <code>&lt;key&gt;=&lt;your-model&gt;</code> to <code>encoder_choices</code>.</li><li>For decoders, add <code>&lt;key&gt;=&lt;your-model&gt;</code> to <code>decoder_choices</code>.</li><li>For separators, add <code>&lt;key&gt;=&lt;your-model&gt;</code> to <code>separator_choices</code>.</li></ul><h3 id="step-3-optional-create-new-loss-functions" tabindex="-1"><a class="header-anchor" href="#step-3-optional-create-new-loss-functions"><span>Step 3 [Optional] Create new loss functions</span></a></h3>',2),dn={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/espnet_model.py",target:"_blank",rel:"noopener noreferrer"},on=i(`<div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span style="color:#DCDCAA;">    @</span><span style="color:#4EC9B0;">staticmethod</span></span>
<span class="line"><span style="color:#569CD6;">    def</span><span style="color:#DCDCAA;"> new_loss</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">ref</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">inf</span><span style="color:#D4D4D4;">):</span></span>
<span class="line"><span style="color:#CE9178;">        &quot;&quot;&quot;Your new loss</span></span>
<span class="line"><span style="color:#CE9178;">        Args:</span></span>
<span class="line"><span style="color:#CE9178;">            ref: (Batch, samples)</span></span>
<span class="line"><span style="color:#CE9178;">            inf: (Batch, samples)</span></span>
<span class="line"><span style="color:#CE9178;">        Returns:</span></span>
<span class="line"><span style="color:#CE9178;">            loss: (Batch,)</span></span>
<span class="line"><span style="color:#CE9178;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#D4D4D4;">        ...</span></span>
<span class="line"><span style="color:#C586C0;">        return</span><span style="color:#D4D4D4;"> loss</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),cn={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/espnet_model.py#L21",target:"_blank",rel:"noopener noreferrer"},un={href:"https://github.com/espnet/espnet/blob/master/espnet2/enh/espnet_model.py#L246",target:"_blank",rel:"noopener noreferrer"},mn=n("h3",{id:"step-4-create-unit-tests-for-the-new-model",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#step-4-create-unit-tests-for-the-new-model"},[n("span",null,"Step 4 Create unit tests for the new model")])],-1),vn={href:"https://github.com/espnet/espnet/tree/master/test/espnet2/enh/encoder",target:"_blank",rel:"noopener noreferrer"},hn={href:"https://github.com/espnet/espnet/tree/master/test/espnet2/enh/decoder",target:"_blank",rel:"noopener noreferrer"},bn={href:"https://github.com/espnet/espnet/tree/master/test/espnet2/enh/separator",target:"_blank",rel:"noopener noreferrer"};function _n(fn,gn){const e=p("ExternalLinkIcon");return t(),r("div",null,[o,n("p",null,[n("a",c,[u,a(e)])]),m,v,h,b,n("p",null,[s("This notebook is created by: Chenda Li ("),n("a",_,[s("@LiChenda"),a(e)]),s(") and Wangyou Zhang ("),n("a",f,[s("@Emrys365"),a(e)]),s(")")]),g,n("p",null,[s("The pretrained models can be download from direct URL, or from "),n("a",x,[s("zenodo"),a(e)]),s(" and "),n("a",q,[s("huggingface"),a(e)]),s(" with model ID.")]),w,n("p",null,[s("Prepare "),y,s(", which will be used in stage 1 in "),E,s(". It can take some arguments as input, see "),n("a",k,[s("egs2/wsj0_2mix/enh1/local/data.sh"),a(e)]),s(" for reference.")]),D,n("blockquote",null,[n("p",null,[s("Remember to check your new scripts with "),n("a",S,[s("shellcheck"),a(e)]),s(", otherwise they may fail the tests in "),n("a",T,[s("ci/test_shell.sh"),a(e)]),s(".")])]),C,n("p",null,[s("Prepare training configuration files (e.g. "),n("a",A,[s("train.yaml"),a(e)]),s(") under "),I,s(".")]),N,z,n("p",null,[s("Write "),F,s(" to provide a template entry script, so that users can easily run your recipe by "),R,s(". See "),n("a",L,[s("egs2/wsj0_2mix/enh1/run.sh"),a(e)]),s(" for reference.")]),j,P,M,n("blockquote",null,[n("p",null,[s("For Time-Frequency masking models, the encoder and decoder would be "),n("a",O,[s("stft_encoder.py"),a(e)]),s(" and "),n("a",H,[s("stft_decoder.py"),a(e)]),s(" respectively, and the separator can be any of "),n("a",G,[s("dprnn_separator.py"),a(e)]),s(", "),n("a",U,[s("rnn_separator.py"),a(e)]),s(", "),n("a",W,[s("tcn_separator.py"),a(e)]),s(", and "),n("a",Y,[s("transformer_separator.py"),a(e)]),s(". For TasNet, the encoder and decoder are "),n("a",B,[s("conv_encoder.py"),a(e)]),s(" and "),n("a",V,[s("conv_decoder.py"),a(e)]),s(" respectively. The separator is "),n("a",J,[s("tcn_separator.py"),a(e)]),s(".")])]),K,n("p",null,[s("For encoder, separator, and decoder models, create new scripts under "),n("a",Z,[s("espnet2/enh/encoder/"),a(e)]),s(", "),n("a",Q,[s("espnet2/enh/separator/"),a(e)]),s(", and "),n("a",X,[s("espnet2/enh/decoder/"),a(e)]),s(", respectively.")]),n("p",null,[s("For a separator model, please make sure it implements the "),$,s(" property. See "),n("a",nn,[s("espnet2/enh/separator/rnn_separator.py"),a(e)]),s(" for reference.")]),n("blockquote",null,[n("p",null,[s("Remember to format your new scripts to match the styles in "),sn,s(" and "),en,s(", otherwise they may fail the tests in "),n("a",an,[s("ci/test_python.sh"),a(e)]),s(".")])]),ln,n("p",null,[s("In "),n("a",pn,[s("espnet2/tasks/enh.py"),a(e)]),s(", add your new model to the corresponding "),tn,s(", e.g.")]),rn,n("p",null,[s("If you want to use a new loss function for your model, you can add it to "),n("a",dn,[s("espnet2/enh/espnet_model.py"),a(e)]),s(", such as:")]),on,n("p",null,[s("Then add your loss name to "),n("a",cn,[s("ALL_LOSS_TYPES"),a(e)]),s(", and handle the loss calculation in "),n("a",un,[s("_compute_loss"),a(e)]),s(".")]),mn,n("p",null,[s("Finally, it would be nice to make some unit tests for your new model under "),n("a",vn,[s("test/espnet2/enh/encoder"),a(e)]),s(", "),n("a",hn,[s("test/espnet2/enh/decoder"),a(e)]),s(", or "),n("a",bn,[s("test/espnet2/enh/separator"),a(e)]),s(".")])])}const qn=l(d,[["render",_n],["__file","espnet_se_demonstration_for_waspaa_2021.html.vue"]]);export{qn as default};
